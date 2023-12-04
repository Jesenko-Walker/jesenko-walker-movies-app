export const getMovies = async () => {
    const url = 'http://localhost:3000/movies';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const getMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/
${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export const patchMovie = async (movie) => {
    const updatedMovie = {
        ...movie,
    };
    const body = JSON.stringify(updatedMovie);

    const url = `http://localhost:3000/movies/${movie.id}`;
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

