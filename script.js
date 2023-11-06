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
]

const fetchPosts = (callback) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => {
            callback(data.slice(0, 4));
        });
};

const showEachPosts = (arrayOfPosts) => {
    arrayOfPosts.forEach((post, index) => {
        const divText = document.createElement('div');
        const divImg = document.createElement('div');
        const postDiv = document.createElement('div');
        const postH2 = document.createElement('h2');
        const postNum = document.createElement('p');
        const postP = document.createElement('p');
        const img = document.createElement('img');

        img.src = imgUrl[index % imgUrl.length];
        divImg.append(img);
        postDiv.classList = 'post-wrapper';
        divText.classList = 'div-text';
        divImg.classList = 'div-img';

        postH2.innerHTML = `User ID: ${post.userId}`;
        postP.innerHTML = `Title: ${post.title}`;
        postNum.innerHTML = `Post ID: ${post.id}`;

        divText.append(postH2, postP, postNum);
        postDiv.append(divImg, divText);
        postsDiv.append(postDiv);

        const makeDiv = () => {
            const divIcons = document.createElement('div');
            divIcons.classList = 'icon-container';

            for (let i = 0; i < 4; i++) {
                const btn = document.createElement('button');
                const btnInput = document.createElement('p');
                const btnImg = document.createElement('img');
                

                btnImg.src = iconsUrl[i % iconsUrl.length];
                btn.append(btnImg);
                divIcons.append(btn, btnInput);
                
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

            postsDiv.append(divIcons);
        };

        makeDiv();
    });
};

fetchPosts(showEachPosts);


// https://dummyjson.com/users/1 ++++ 
// https://dummyjson.com/docs/posts ++++

// По кнопке tweet добовлаем пост.

const btnTweet = document.querySelector('.tweet');
const inputWhatHappening = document.querySelector('.what-heppening');


btnTweet.addEventListener('click', () => {
    const postText = inputWhatHappening.value;

    if (postText !== '') {
        const newPost = document.createElement('div');
        const postContent = document.createElement('p');
        const postName = document.createElement('p')
        

        
        postContent.textContent = postText;
   


        newPost.append(postContent);
        root1.append(newPost);
        inputWhatHappening.value = ''; 
    }
});

// const fetchUrl = () => {
//     fetch('https://dummyjson.com/users/1')
//     .then(res => res.json())
//     .then( data => data)
// }


// const fetchPostById = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
//     const data = await response.json()

//     const postResponse = await fetch(
//        `https://jsonplaceholder.typicode.com/posts/?userId=${data.userId}` 
//     )
//     const postData = await postResponse.json()
//     console.log(postData)
// }

// fetchPostById()