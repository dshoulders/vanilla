
const bus = document.createElement('div')
  
export const subscribe = (event, callback) => {
    bus.addEventListener(event, callback)
} 
      
export const unsubscribe = (event, callback) => {
    bus.removeEventListener(event, callback)
}  

export const dispatch = (event, detail = {}) => {
    bus.dispatchEvent(new CustomEvent(event, { detail }))
}
