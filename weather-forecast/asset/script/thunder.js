async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const resultfetch = await response.json();
        return(resultfetch);
    } 
    catch (error) {
            console.error(error.message);
    } 
}
function findHN(data) {
}
async function main () {
    let warnings;
    const url = "http://hymetnet.gov.vn/dongset";
    let thunders = await getData(url);
    for (let i = 0; i < 6; i++) {
        const objectContent = Object.values(thunders)[i];
        const check0 = objectContent.filter((content) => content.includes("Từ Liêm"));
        if (Object.keys(check0).length > 0 ) {
            warnings = true;
            break;
        };
        const check1 = objectContent.filter((content) => content.includes("Cầu Giấy"));
        if (Object.keys(check1).length > 0 ) {
            warnings = true;
            break;
        };
        const check2 = objectContent.filter((content) => content.includes("Nghĩa Đô"));
        if (Object.keys(check2).length > 0 ) {
            warnings = true;
            break;
        };
    };
    if (warnings == true) {
        document.getElementById("warningsStorm").style.display = "block";
    }
}
main();