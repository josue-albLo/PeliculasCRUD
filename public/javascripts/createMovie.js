let currentMovieId = null;

function loadMovieDetails(movieId) {
    $.ajax({
        url: `/api/v1/movies/get_movie/${movieId}`,
        type: 'GET',
        success: function (movie) {
            $('#title').val(movie.title);
            $('#releaseYear').val(movie.releaseYear);
            $('#genre').val(movie.genre);
            $('#director').val(movie.director);
            $('#actors').val(movie.actors.join(', '));
            $('#plot').val(movie.plot);
            $('#rating').val(movie.rating);

            // Al cargar los detalles, establece el ID de la película actual
            currentMovieId = movieId;
        },
        error: function (error) {
            console.error('Error al cargar la película', error);
        }
    });
}


function saveMovie() {
    const formData = {
        title: document.getElementById('title').value,
        releaseYear: document.getElementById('releaseYear').value,
        genre: document.getElementById('genre').value,
        director: document.getElementById('director').value,
        actors: document.getElementById('actors').value.split(','),
        plot: document.getElementById('plot').value,
        rating: document.getElementById('rating').value
    };

    if (!currentMovieId) {

        // Realiza una solicitud AJAX para enviar los datos al servidor
        $.ajax({
            url: '/api/v1/movies/create_movie',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (data) {
                console.log('Película agregada exitosamente');
                window.location.reload();

                // Aquí puedes hacer algo después de agregar la película, si es necesario
            },
            error: function (error) {
                console.error('Error al agregar la película', error);
            }
        });
    }
    else {
        // Editar la película existente
        $.ajax({
            url: `/api/v1/movies/edit_movie/${currentMovieId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function () {
                // Acciones después de editar la película
                window.location.reload();
            },
            error: function (error) {
                console.error('Error al editar la película', error);
            }
        });
    }
}
