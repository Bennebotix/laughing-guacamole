const notif = (title, body, icon) => { // Icon doesn't properly owrk
  window.Notification?"granted"===Notification.permission?serviceWorkerRegistration.showNotification(title,{body:body,icon:icon}):Notification.requestPermission().then(function(o){"granted"===o?serviceWorkerRegistration.showNotification(title,{body:body,icon:icon}):console.log("User blocked notifications.")}).catch(function(o){console.error(o)}):console.log("Browser does not support notifications.");
}
