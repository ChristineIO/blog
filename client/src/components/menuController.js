const menuController = () => {
    let menuIsVisible = false;
    let menuVisible = () => {
        if (!menuIsVisible) {
            document.getElementById('dropdown-list').style.display = 'grid'
            menuIsVisible = true
        } else if (menuIsVisible) {
            document.getElementById('dropdown-list').style.display = 'none'
            menuIsVisible = false
        }
    }
}

export default menuController