module.exports = {
    getMyProfile: getMyProfile,
    getMyFavoriteScripts: getMyFavoriteScripts,
    getMyScripts: getMyScripts,
    getOrganizationScripts: getOrganizationScripts,
    getGlobalScripts: getGlobalScripts
};

function getMyProfile() {
    return {
		name: "Pladeholder Name",
		email: "place@holder.email"      
    };
}

function getMyFavoriteScripts() {
    return [
        createSampleScript("1", "Script One", "alert('script one');"),
        createSampleScript("2", "Script Two", "alert('script two');"),
        createSampleScript("3", "Script Three", "alert('script three');")
    ];
}

function getMyScripts() {
    return [
        createSampleScript("1", "Script One", "alert('script one');"),
        createSampleScript("2", "Script Two", "alert('script two');"),
        createSampleScript("3", "Script Three", "alert('script three');")
    ];
}

function getOrganizationScripts() {
    return [
        createSampleScript("4", "Script Four", "alert('script four');"),
        createSampleScript("5", "Script Five", "alert('script five');"),
        createSampleScript("6", "Script Six", "alert('script six');")
    ];
}

function getGlobalScripts() {
    return [
        createSampleScript("7", "Script Seven", "alert('script seven');"),
        createSampleScript("8", "Script Eight", "alert('script eight');"),
        createSampleScript("9", "Script Nine", "alert('script nine');")
    ];
}

function createSampleScript(id, name, script) {
    return {
        id: id,
        name: name,
        script: script
    };
}