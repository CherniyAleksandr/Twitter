// 1 уровень сложности: продолжаем работу над проектом твиттера:
// 1) добавляем на аватарку обработчик события, который позволяет перейти на страницу пользователя, где отображается информация о нем и все его посты
// 2) Чтобы перейти на новую страницу, можно использовать специальный метод 
//  window.location.href = /user.html?userId=${userId}
// 3) для этого мы создаем отдельную страницу user.html(находится рядом с index.html), в которой будет отображаться наш код 
// 4) создаем отдельный файл JS userpageui.js
// 5) подключаем его к user.html 
// 6) Чтобы получить данные о пользователе, мы можем обратиться к встроенным методам браузера:
// const urlParams = new URLSearchParams(window.location.search)
// const userId = urlParams.get('userId')
// 7) этот id мы можем использовать для запроса на сервер:
// getUserAndPosts(userId)
// 8) в функции делаем два запроса: для получения данных пользователя и для всех его постов:
//     fetch(https://dummyjson.com/users/${userId}),
//      fetch(https://dummyjson.com/posts/user/${userId})
// 9) результат отрисовываем)


const userPage = document.querySelector('#userPage')

console.log(userPage);

const fetchUserDataAndPosts = async (userId,callback) => {
    try {
        const [responseUser, responsePosts] = await Promise.all([
            fetch(`https://dummyjson.com/users/${userId}`),
            fetch(`https://dummyjson.com/posts/user/${userId}`)


        ])
        if(!responsePosts.ok) {
            throw Error('User dosent exsist')
        };
        const userData = await responseUser.json()
        const postData = await responsePosts.json()
        console.log('userData', userData)
        console.log('postData', postData)
        
        callback(userData.firstName,userData.email,postData.posts)

    } catch (error) {
        console.log(error);
        postsDiv.innerText = error
    }


}

fetchUserDataAndPosts(2, (firstName, email, posts) => {
    const firstNameH2 = document.createElement('h2');
    firstNameH2.textContent = `Name: ${firstName}`;

    const emailP = document.createElement('p');
    emailP.textContent = `Email: ${email}`;

    const postsContainer = document.createElement('div');
    
   
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.textContent = typeof post === 'object' ? JSON.stringify(post) : post;
        postsContainer.appendChild(postDiv);
    });

    userPage.append(firstNameH2)
    userPage.append(emailP)
    userPage.append(postsContainer)

  

   
});