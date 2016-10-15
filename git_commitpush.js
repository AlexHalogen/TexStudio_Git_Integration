%SCRIPT
choisedialog = UniversalInputDialog(["Commit with Push","Commit"],"Git","choiseGIT")
choisedialog.setWindowTitle("Git")
choise = choisedialog.get("comment")
filename = editor.fileName()

var d = new Date()
commitString = "TexStudio " + d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) +("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2)
if (choisedialog.exec() != null) {
    if (choisedialog.get("choiseGIT") == "Commit") {
        dialog = new UniversalInputDialog()
        dialog.setWindowTitle("Git commit / push")
        dialog.add( commitString, "Comment", "comment")
        dialog.add(true, "Commit all Files","allfiles")
        if (dialog.exec() != null) {
            comment = dialog.get("comment")
            if ((dialog.get("allfiles")) == true){
                buildManager.runCommand("git commit -a -m \"" + comment + "\"", filename)
            }else{
                buildManager.runCommand("git commit " + filename + " -m \"" + comment + "\"", filename)
            }
        }
    } else
    if (choisedialog.get("choiseGIT") == "Commit with Push") {
        cmd = "git rev-parse --abbrev-ref HEAD >/dev/null 2>&1"
        workdir = filename.substring(0, filename.lastIndexOf("/"))
        var proc = system(cmd, workingDirectory=workdir)
        proc.waitForFinished()

        statusMessage = proc.readAllStandardOutputStr()
        branchName = statusMessage.trim()

        dialog = new UniversalInputDialog()
        dialog.setWindowTitle("Git commit / push")
        dialog.add(commitString, "Comment", "comment")
        dialog.add(branchName, "Branch", "branch")
        dialog.add(true, "Commit all Files","allfiles")
        if (dialog.exec() != null) {
            comment = dialog.get("comment")
            branch = dialog.get("branch")
            if ((dialog.get("allfiles")) == true){
                buildManager.runCommand("git commit -a -m \"" + comment + "\"", filename)

            }else{
                buildManager.runCommand("git commit " + filename + " -m \"" + comment + "\"", filename)
            }
            buildManager.runCommand("git push origin \"" + branch +"\"", filename)
        }
    }
}


