let movies = []
let genres = []

function addMovie() {
    const movieInput = document.getElementById('movie')
    const genreInput = document.getElementById('genre')
    const movieList = document.getElementById('movieList')

    let movie = movieInput.value.trim()
    let genre = Number(genreInput.value.trim())

    if (movie != '' && !isNaN(genre) && genre >= 1 && genre <= 3) {
        movies.push(movie)
        genres.push(genre)
        let li = document.createElement('li')
        li.textContent = movie
        switch (genre) {
            case 1:
                li.classList.add('action')
                break;
            case 2:
                li.classList.add('comedy')
                break;
            case 3:
                li.classList.add('drama')
                break;
        }

        const watchedButton = document.createElement('button')
        watchedButton.textContent = 'Watched'
        watchedButton.onclick = function () {
            li.classList.toggle('watched')
        }

        li.appendChild(watchedButton)
        saveData()


        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.onclick = function () {
            const edit = prompt('Edit the movie ', movie)
            if (edit != null && edit.trim() !== '') {
                 li.firstChild.textContent = edit
                movie = edit
            }
        }

        li.appendChild(editButton)
        saveData()

        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.onclick = function () {
            movieList.removeChild(li)
            const movieIndex = movies.indexOf(movie)
            movies.splice(movieIndex, 1)
            genres.splice(movieIndex, 1)
        }

        li.appendChild(removeButton)
        saveData()
        movieList.appendChild(li)
        saveData()
        movieInput.value = ''
        genreInput.value = ''



    }

    else {
        alert('Enter a valid input')
    }
}

function saveData() {
    localStorage.setItem("MovieList", movieList.innerHTML)
}

function getData() {
    movieList.innerHTML = localStorage.getItem("MovieList")
}

// getData()


