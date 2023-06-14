export const getHtmlEmailverification = (token) => {
    return (`
    <h1>Hello World, we are just getting started</h1>
    <h2>here is your OTP: ${token}</h2>
    `)
    // return (`
    //     <h2>Kindly click on the link to verify your email address<h2><br>
    //     <a href="http://localhost:3000/verify/${token}"><h1>Verify</h1></a><br>
    //     <br>
    //     <h2>Please do NOT reply to this email</h2>
    // `)
}

export const getHtmlEmailPapers = (papers, name, topic) => {
    var string = `
    <h1>Your Weekly Paper :-)</h1>
    <h2>Hi ${name},</h2>
    <h3>Enjoy your weekly dose of ${topic}: </h3>
    ${papers.map(({ title, link }, indx) => {
        return `
        <h4>
            <a href="${link}">${title}</a>
        </h4>`
    })}`
    return string
}