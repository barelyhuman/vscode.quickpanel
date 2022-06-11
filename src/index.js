/* global MutationObserver document */

let mainContainerUp = false
let quickInputUp = false
const mainContainerClass = 'monaco-workbench'
const inputWidgetClass = 'quick-input-widget'

function init() {
  monitorBody()
}

function monitorBody() {
  const bodyObsrv = new MutationObserver(function (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(item => {
        if (String(item.className).includes(mainContainerClass))
          mainContainerUp = true
      })
    })

    if (!mainContainerUp) return

    bodyObsrv.disconnect()
    monitorMainContainer()
  })

  bodyObsrv.observe(document.body, {
    childList: true,
  })
}

function monitorMainContainer() {
  const mainContainerObsrv = new MutationObserver(function (mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (String(node.className).includes(inputWidgetClass)) {
          console.log('found it')
          quickInputUp = true
        }
      })
    })

    if (!quickInputUp) return

    resizeInputWidgetList()
    monitorInputWidget()
  })

  const elem = document.querySelector('.' + mainContainerClass)

  if (!elem) throw new Error('no main container here')

  mainContainerObsrv.observe(elem, {
    childList: true,
  })
}

function monitorInputWidget() {
  let resizeTimerHandle

  // will trigger once / twice when the input is initialized
  const inputWidgetObsrv = new MutationObserver(function (mutations) {
    mutations.forEach(_ => {
      resizeInputWidgetList()
    })
  })

  // triggers everytime the child items change,
  // and so need to be debounced
  const listRowObsrv = new MutationObserver(function (mutations) {
    mutations.forEach(() => {
      if (resizeTimerHandle) clearTimeout(resizeTimerHandle)
      resizeTimerHandle = setTimeout(() => {
        resizeInputWidgetList()
      }, 60)
    })
  })

  const listRows = document.querySelector(
    '.quick-input-widget .monaco-list-rows'
  )

  if (listRows) {
    listRowObsrv.observe(listRows, {
      childList: true,
    })
  }

  const classes = ['.' + mainContainerClass, '.' + inputWidgetClass]

  const elem = document.querySelector(classes.join(' '))

  if (!elem) throw new Error('no input widget here')

  inputWidgetObsrv.observe(elem, {
    attributes: true,
    attributeFilter: ['style'],
  })
}

async function resizeInputWidgetList() {
  reRenderListRows()
}

function reRenderListRows() {
  const listRows = document.querySelector(
    '.quick-input-widget .monaco-list-rows'
  )

  const listContainer = document.querySelector(
    '.quick-input-widget .monaco-list'
  )

  const numberOfElements = listRows.childNodes.length || 0
  const listRowTop = Number(listRows.style.top.replace('px', ''))
  const height = numberOfElements * 32

  listRows.style.height = height + Math.abs(listRowTop) + 'px'
  listContainer.style.maxHeight = `calc(${height}px)`

  for (let i = 0; i < listRows.children.length; i += 1) {
    const childListItem = listRows.children[i]
    childListItem.style.top = Math.abs(listRowTop) + i * 32 + 'px'
    childListItem.style.height = '32px'
  }
}

init()
