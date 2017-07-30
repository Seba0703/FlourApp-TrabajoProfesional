	Set WshShell = WScript.CreateObject("WScript.Shell")
Return = WshShell.Run("node server_app.js", 0, true)