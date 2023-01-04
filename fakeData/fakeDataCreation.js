const User = require("../Models/user.model");
const Movie = require("../Models/movie.model");
const Theatre = require("../Models/theatre.model");
const bcrypt = require("bcrypt")

exports.fakeSeeders = async() => {
    try {
        await User.collection.drop();
        await User.create({
            name: "Pranit Dubal",
            userId: "6785",
            emailId: "pranitdubal5@gmail.com",
            role: "ADMIN",
            password: bcrypt.hashSync('password', 8)
        })
        console.log('Created User')
    } catch (error) {
        console.log(error)
    }

    let client1, client2, client3;
    try {
        client1 = await User.create({
            name: "Client1",
            userId: "1111",
            emailId: "client1@gmail.com",
            role: "CLIENT",
            password: bcrypt.hashSync('password', 8)
        });
        client2 = await User.create({
            name: "Client2",
            userId: "2222",
            emailId: "client2@gmail.com",
            role: "CLIENT",
            password: bcrypt.hashSync('password', 8)
        });
        client3 = await User.create({
            name: "Client3",
            userId: "3333",
            emailId: "client3@gmail.com",
            role: "CLIENT",
            password: bcrypt.hashSync('password', 8)
        });
        console.log('Created User')
    } catch (error) {
        console.log(error)
    }

    let movie1, movie2, movie3;
    try {
        await Movie.collection.drop();
        movie1 = await Movie.create({
            name: "Bachhan Pandey",
            description: "Comedy Masala Movie",
            casts: ["Akshay Kumar", "Jacqueline Fernandiz"],
            Director: "Farhad Samji",
            Trailer_URL: "http://bacchanpandey/trailers/1",
            poster_URL: "http://bacchanpandey/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        movie2 = await Movie.create({
            name: "Jalsa",
            description: "Intense Drama Movie",
            casts: ["Vidya Balan", "Shefali Shah"],
            Director: "Suresh Triveni",
            Trailer_URL: "http://jalsa/trailers/1",
            poster_URL: "http://jalsa/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        movie3 = await Movie.create({
            name: "Jhund",
            description: "Comedy Drama Movie",
            casts: ["Amitabh Bachchan", "Abhinay Raj"],
            Director: "Nagraj Manjule",
            Trailer_URL: "http://jhund/trailers/1",
            poster_URL: "http://jhund/posters/1",
            language: "Hindi",
            releaseDate: "04-03-2022",
            releaseSatus: "RELEASED"
        });

        console.log('Movies Created')
    } catch (error) {
        console.log(error)
    }


    try {
        await Theatre.collection.drop();
        await Theatre.create({
            name: "Roman Empire",
            city: "Mumbai",
            description: "Multiplex Theatre",
            pincode: 400604,
            movies: [movie1._id, movie3._id],
            ownerId: client1._id

        });
        await Theatre.create({
            name: "Viviana Mall",
            city: "Thane",
            description: "4DX Theatre",
            pincode: 400012,
            movies: [movie1._id, movie2._id],
            ownerId: client2._id

        });
        await Theatre.create({
            name: "Rmall INOX",
            city: "Mulund",
            description: "RMall theatre",
            pincode: 400602,
            movies: [movie2._id, movie3._id],
            ownerId: client3._id

        });
        console.log('Theatre Created')
    } catch (error) {
        console.log(error)
    }
}