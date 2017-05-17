exports.exec = function(cmd, options) {
  return new Promise((resolve, reject) => {
    let child_process = require('child_process')
    let parts = cmd.split(/\s+/g)
    let p = child_process.spawn(parts[0], parts.slice(1), options)
    p.on('exit', function(code){
      console.log('exited with: ',code)
      let err = null
      if (code) {
          err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"')
          err.code = code
          err.cmd = cmd
          reject(err)
      }
      else {
        resolve(code)
      }
    })
  })
}

exports.series = function(cmds, options) {
  let processes = cmds.map(cmd => exports.exec(cmd, options))
  return Promise.all(processes)
}
