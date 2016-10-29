%SCRIPT
filename = editor.fileName()
workdir = filename.substring(0, filename.lastIndexOf("/"))

d = new Date()
commitString = "TexStudio " + d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" +("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" +("0" + d.getMinutes()).slice(-2)

// Get current branch name
cmd = "git rev-parse --abbrev-ref HEAD >/dev/null 2>&1"
var proc = system(cmd, workingDirectory=workdir)
proc.waitForFinished()
statusMessage = proc.readAllStandardOutputStr()
branchName = statusMessage.trim()

// Create a new dialog box
dialog = new UniversalInputDialog()
dialog.setWindowTitle("Git Commit/Push")
dialog.add(true, "Push to remote repo","push")
dialog.add(branchName, "Branch", "branch")
dialog.add(commitString, "Comment","comment")
dialog.add(true, "Commit all Files","allfiles")

if (dialog.exec() != null) {
    
    comment = dialog.get("comment")
    
    if ((dialog.get("push"))  == true) {
        
        branch = dialog.get("branch")

        if ((dialog.get("allfiles")) == true) {
            buildManager.runCommand("git commit -a -m \"" + comment + "\"", filename)
            buildManager.runCommand("git push origin \"" + branch + "\"",filename )
        }
        else {
            buildManager.runCommand("git commit " + filename + " -m \"" + comment + "\"", filename)
            buildManager.runCommand("git push origin \"" + branch + "\"",filename )
        }

    }
    else {

        if ((dialog.get("allfiles")) == true) {
            buildManager.runCommand("git commit -a -m \"" + comment + "\"", filename)
        }

        else {
            buildManager.runCommand("git commit " + filename + " -m \"" + comment + "\"", filename)
        }

    }

}