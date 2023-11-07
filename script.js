const postsDiv = document.querySelector('#root1');

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

Promise.all([fetchPosts(), fetchUsers()])
    .then(data => {
        const posts = data[0].posts.slice(0,6);
        const users = data[1].users;
        showEachPosts(posts, users);
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

                }
                if (i === 0) {
                    let commentCount = 0;
                    btn.addEventListener('click', () => {
                        commentCount++;
                        btnInput.innerText = commentCount.toString()
                    })
                }
                if (i === 2) {
                    let reTweet = 0;
                    btn.addEventListener('click', () => {
                        reTweet++;
                        btnInput.innerText = reTweet.toString()
                    })
                }
            }

            postsDiv.append(divIcons, divBorder);
        };

        makeDiv();
    });
};


// По кнопке tweet добовлаем пост.
const btnTweet = document.querySelector('.tweet');
const inputWhatHappening = document.querySelector('.what-heppening');

btnTweet.addEventListener('click', () => {
    const postText = inputWhatHappening.value;

    if (postText !== '') {
        const newPost = document.createElement('div');
        const postContent = document.createElement('p');
        const postName = document.createElement('p')
        postName.innerText = "Yo"
        postContent.textContent = postText;
        

        
        newPost.append(postContent);
        root1.append(newPost);
        inputWhatHappening.value = '';
    }
});


