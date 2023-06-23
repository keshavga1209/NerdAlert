export const getHtmlEmailverification = (token) => {
    // return (`
    // <h1>Hello World, we are just getting started</h1>
    // <h2>here is your OTP: ${token}</h2>
    // `)
    return (`
        <h2>Kindly click on the link to verify your email address<h2><br>
        <a href="http://localhost:5173/kv-react/verify/${token}"><h1>Verify</h1></a><br>
        <br>
        <h2>Please do NOT reply to this email</h2>
    `)
}

export const getHtmlEmailPapers = (papers, name) => {
    if (papers.length === 0) {
        return `
        <h1>Your Weekly Paper :-)</h1>
        <h2>Hi ${name},</h2>
        <h3>Subscribe to the wIEEEkly for best recommendations of thesis of your interest 😉</h3>
        `
    }
    var string = `
    <h1>Your Weekly Paper :-)</h1>
    <h2>Hi ${name},</h2>
    <h3>Enjoy your weekly dose of papers: </h3>
    <ul>
    ${papers.map(({ title, link }, indx) => {
        return `
        <li>
        <h4>
            <a href="${link}">${title}</a>
        </h4>
        </li>`
    }).join(' ')}
    </ul>`
    return string
}

export const sendUpdatedPreferences = (name, preferences) => {
    var string = `
    <h2>Hi ${name},</h2>
    <h3>Your updated preferences for research papers are: </h3>
    <ul>
    ${preferences.map((pref, indx) => {
        return `
        <li>
        <h4>${pref}</h4>
        </li>`
    }).join(' ')}
    </ul>`
    return string
}