
function deleteMovie(movieId) {
    console.log(movieId)
    fetch(`/api/v1/movies/delete_movie/${movieId}`, {
        method: 'DELETE'
    }).then(res => {
        console.log(res);
        window.location.reload();
    }).catch(err => console.log(err));
}
