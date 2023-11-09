const postsDiv = document.querySelector('#root1');

const makePull = document.querySelector('pull')


const imgUrl = [
    './images/CNN.svg',
    './images/TheNewYork.svg',
    './images/Tweeter.svg',
    './images/Tweeter.svg'
];

const iconsUrl = [
    `./images/media-icons/chat.svg`,
    `./images/media-icons/Retweet.svg`,
    `./images/media-icons/like.svg`,
    `./images/media-icons/Share.svg`
];

const fetchPosts = () => {
    return fetch('https://dummyjson.com/posts')
        .then(res => res.json());
}

const fetchUsers = () => {
    return fetch('https://dummyjson.com/users')
        .then(res => res.json());
};

const avatarImg = () => {

}




const makeDiv = () => {
    const divIcons = document.createElement('div');
    divIcons.classList.add('icon-container');
    const divBorder = document.createElement('div');
    divBorder.classList.add('border-bottom');

    for (let i = 0; i < 4; i++) {
        const btn = document.createElement('button');
        const btnInput = document.createElement('p');
        const btnImg = document.createElement('img');

        btnImg.src = iconsUrl[i % iconsUrl.length];
        btn.append(btnImg);
        divIcons.append(btn, btnInput);
        divBorder.append(divIcons);

        if (i === 1) {
            let likeCount = 0;
            btn.addEventListener('click', () => {
                likeCount++;
                btnInput.innerText = likeCount.toString();
            });
        } else if (i === 0) {
            let commentCount = 0;
            btn.addEventListener('click', () => {
                commentCount++;
                btnInput.innerText = commentCount.toString();
            });
        } else if (i === 2) {
            let reTweet = 0;
            btn.addEventListener('click', () => {
                reTweet++;
                btnInput.innerText = reTweet.toString();
            });
        }
    }

    postsDiv.append(divIcons, divBorder);
};

Promise.all([fetchPosts(), fetchUsers()])
    .then(data => {
        const posts = data[0].posts.slice(0, 2);
        const users = data[1].users;
        showEachPosts(posts, users);
        console.log(users);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

const showEachPosts = (posts, users) => {
    posts.forEach((post, index) => {
        const divText = document.createElement('div');
        const divImg = document.createElement('div');
        const postDiv = document.createElement('div');
        const postH2 = document.createElement('h2');
        const postNum = document.createElement('p');
        const postP = document.createElement('p');
        const img = document.createElement('img');

        img.setAttribute('src', users[index].image);
        divImg.append(img);
        postDiv.classList.add('post-wrapper');
        divText.classList.add('div-text');
        divImg.classList.add('div-img');

        postH2.innerHTML = `${users[index].firstName} ${users[index].lastName}`;
        postP.innerHTML = `Title: ${post.title}`;
        postNum.innerHTML = `Post ID: ${post.id}`;

        divText.append(postH2, postP, postNum);
        postDiv.append(divImg, divText);
        postsDiv.append(postDiv);
        makeDiv()
      
    });
};




// По кнопке tweet добовлаем пост.
const btnTweet = document.querySelector('.tweet');
const inputWhatHappening = document.querySelector('.what-heppening');


const postCreate = async () => {
    const usersData = await fetchUsers();
    // const avatar = document.querySelector('.avatar');
    const avatarDiv = document.querySelector('.photo')
    const avatarImage = document.querySelector('.avatar');
    btnTweet.addEventListener('click', () => {
        const postText = inputWhatHappening.value;

        if (postText !== '') {
            const userIdForPost = 12;
            const currentUser = usersData.users.find(user => user.id === userIdForPost);
           
            if (currentUser) {
               
                const newPost = document.createElement('div');
                newPost.classList = 'post-wrapper'
                const postContent = document.createElement('p');
                const postName = document.createElement('h2');
                const divTextWrapper = document.createElement('div')
                const userImage = document.createElement('img');
                const postId = document.createElement('p')

                postContent.textContent = `Title: ${postText}`;
                postName.innerText = `${currentUser.firstName} ${currentUser.lastName}`;
                userImage.src = currentUser.image;
                postId.innerText = `Post ID: ${currentUser.id}`;

                userImage.classList.add('user-avatar');
               
                avatarImage.src = ''
                avatarImage.src = currentUser.image;
                // avatarImage.src = ''
                // avatarImage.src = ''
                 // avatarImage.src = ''

                


                divTextWrapper.append(postName, postContent,postId)
                newPost.append(userImage, divTextWrapper);
                postsDiv.append(newPost);
                inputWhatHappening.value = '';
                makeDiv()
                avatarDiv.prepend(avatarImage)

            } else {
                console.log('Пользователь не найден');
            }
        }
    });
};

postCreate();


// const btnTweet = document.querySelector('.tweet');
// const inputWhatHappening = document.querySelector('.what-heppening');

// const createForm = async (userId) => {
//     const userData = await fetchUsers(); // Получить данные всех пользователей

//     const user = userData.users.find(user => user.id === userId); // Найти пользователя по ID

//     if (user) {
//         const { id, image, username } = user;

//         const userName = document.createElement('h2');
//         userName.innerText = username;

//         const userImage = document.createElement('img');
//         userImage.src = image;

//         btnTweet.addEventListener('click', async (event) => {
//             event.preventDefault();

//             const postData = {
//                 body: inputWhatHappening.value,
//                 userId: id
//             };

//             await addPost(postData); // Предполагается, что addPost отправляет данные на сервер для создания нового поста
//             inputWhatHappening.value = '';
//         });
//     } else {
//         console.log('Пользователь не найден'); // В случае, если пользователя с таким ID не существует
//     }
//     root1.append(userName,userImage,postData)
// }

// // Используйте функцию createForm, передав нужный ID пользователя
// const userIdForPost = 5; // Замените на нужный вам ID пользователя
// createForm(userIdForPost);



// const btnTweet = document.querySelector('.tweet');
// const inputWhatHappening = document.querySelector('.what-heppening');

// const createForm = async () => {
//     const {id,image,username} = await fetchUsers(1)
//     const userName = document.createElement('h2')
//     userName.innerText = username
//     const userImage = document.createElement('img')
//     userImage.src = image
//     const inputWhatHappening = document.querySelector('.what-heppening');

//     tweet.addEventListener('submit', (event) => {
//         event.preventDefault()
//         const dataObject = {
//             body: inputWhatHappening.value,
//             userId: id,
//         }
//         addPost(dataObject)
//         inputWhatHappening.value = ' '
//     })
// }