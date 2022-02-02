
// to get item from the local storage
export const getVal = (key)=>{
    const item = localStorage.getItem(key)&&b64_to_utf8(localStorage.getItem(key))
    //console.log("Getting "+ key + " from the local storage", item)
    return item
}
// to set item to the local storage
export const setVal = (key,item)=>{
    item = utf8_to_b64(item)
    localStorage.setItem(key,item)
    //console.log("setting "+ key + " to the local storage for the item ", item)
}

// to remove item to the local storage
export const removeVal = (key)=>{
    localStorage.removeItem(key)
    //console.log("Removing "+ key + " from the local storage")
    
}

export function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
      
export function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}
    