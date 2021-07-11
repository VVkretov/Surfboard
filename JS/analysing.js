const path = "/users/download/index.html"

const isHtml = path => {
    const reguiredExt = ".html";
    const pathExt = path.slice(-5);

    // return pathExt == reguiredExt

    if (pathExt == reguiredExt) {
        return true
    } else {
        return false
    }
}


console.log(isHtml(path));