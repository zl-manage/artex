let applist = [
    {
        name: 'Playground ai',
        banner: 'https://neuralnetworkpress.com/sites/8/321/PLAYGROUND_AI.png',
        logo: 'https://cdn-1.webcatalog.io/catalog/playground-ai/playground-ai-icon-filled-256.png?v=1675593234412',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Quill bot',
        banner: 'https://www.elegantthemes.com/blog/wp-content/uploads/2023/11/quillbot-ai-review.jpg',
        logo: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/hohs8swq3kxoldxg0crz',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Jasper Ai',
        banner: 'https://assets.website-files.com/63e6b9ee2fc65e7ab40f9328/63eebcfd0e29452d0eae1603_What%20is%20Jasper.ai%20-%20A%20Comprehensive%20Guide%20to%20the%20ChatGPT%20Powered%20Writing%20Software.jpg',
        logo: 'https://www.elizabethalarcon.com/wp-content/uploads/2022/01/JASPER-WOOCOMMERCE-PRODUCT-CATALOG.png',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Murf Ai',
        banner: 'https://play-lh.googleusercontent.com/uC_w0WsV3E4qzbnieU7xAaJzLQZghCr4wUVBxLvjXkniCXOq2F86sxl0rT2meisWe6M',
        logo: 'https://images.ai-finder.net/logos%2Fmurfai.png',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Synthesia Ai',
        banner: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/62556b0c0f63294bbf9b2353_OG%20image%20front%20(4)%20(1).png',
        logo: 'https://yt3.googleusercontent.com/PG57-dXcWnRrPU_jI0gIGsugZzNrlgV7qub5MdubR411GqFlObbHH_P3OQ790_dGVLB3FgAVEQ=s900-c-k-c0x00ffffff-no-rj',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Remove.bg',
        banner: 'https://www.slazzer.com/static/images/remove_image_background.jpg',
        logo: 'https://play-lh.googleusercontent.com/UVktVy7A1ytREvn8atk5RvSCcM_5Mc7WDCn8fu56XtZL0OvDey1DUtr-CJ6wk3vWPQXX',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    }
];


applist.forEach(e => {
    let card = `<li>
    <img src="${e.banner}" alt="" class="app-banner">
    <div class="info">
        <img src="${e.logo}"
            alt="" class="app-icon">
        <h4>${e.name}</h4>
        <p>${e.description}</p>
    </div>
    </li>`

    document.querySelector('.card-list').innerHTML += card
})


let applist2 = [
    {
        name: 'Cutdrop',
        banner: 'https://static.clipdrop.co/web/homepage/preview.jpg',
        logo: 'https://pbs.twimg.com/profile_images/1568611044913709063/HBO-bbEB_400x400.jpg',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Eleven labs',
        banner: 'https://voicebot.ai/wp-content/uploads/2023/01/elevenlabs.png',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Eleven_Labs.png',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
    {
        name: 'Sleekpad',
        banner: 'https://sleekpad-0.web.app/assets/hero-b22673ab.png',
        logo: 'https://sleekpad-0.web.app/assets/logo-d879986a.png',
        description: 'Lorem ipsum dolor sit.',
        downloadLink: '',
    },
]

applist2.forEach(e => {
    let card = `<li>
    <img src="${e.banner}" alt="" class="app-banner">
    <div class="info">
        <img src="${e.logo}"
            alt="" class="app-icon">
        <h4>${e.name}</h4>
        <p>${e.description}</p>
    </div>
    </li>`

    document.querySelector('.card-list2').innerHTML += card
})