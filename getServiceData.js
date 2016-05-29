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
		{
			title: "One",
			description: "This is item one",
			author: "Rob Howard",
			modifiedDate: "7/4/2016",
			isNew: true,
			isUnseen: false,
			isFavorite: true
		},
		{
			title: "Two",
			description: "This is item two",
			author: "Richard DiZerega",
			modifiedDate: "4/11/2016",
			isNew: false,
			isUnseen: true,
            isFavorite: false
		},
		{
			title: "Three",
			description: "This is item three",
			author: "Santa Claus",
			modifiedDate: "5/19/2016",
			isNew: false,
			isUnseen: false,
            isFavorite: false
		}
	];
}

function getMyScripts() {
    return [
		{
			title: "One",
			description: "This is item one",
			author: "Rob Howard",
			modifiedDate: "7/4/2016",
			isNew: true,
			isUnseen: false,
			isFavorite: true
		},
		{
			title: "Two",
			description: "This is item two",
			author: "Richard DiZerega",
			modifiedDate: "4/11/2016",
			isNew: false,
			isUnseen: true,
            isFavorite: false
		},
		{
			title: "Three",
			description: "This is item three",
			author: "Santa Claus",
			modifiedDate: "5/19/2016",
			isNew: false,
			isUnseen: false,
            isFavorite: false
		}
	];
}

function getOrganizationScripts() {
    return [
		{
			title: "One",
			description: "This is item one",
			author: "Rob Howard",
			modifiedDate: "7/4/2016",
			isNew: true,
			isUnseen: false,
			isFavorite: true
		},
		{
			title: "Two",
			description: "This is item two",
			author: "Richard DiZerega",
			modifiedDate: "4/11/2016",
			isNew: false,
			isUnseen: true,
            isFavorite: false
		},
		{
			title: "Three",
			description: "This is item three",
			author: "Santa Claus",
			modifiedDate: "5/19/2016",
			isNew: false,
			isUnseen: false,
            isFavorite: false
		}
	];
}

function getGlobalScripts() {
    return [
		{
			title: "One",
			description: "This is item one",
			author: "Rob Howard",
			modifiedDate: "7/4/2016",
			isNew: true,
			isUnseen: false,
			isFavorite: true
		},
		{
			title: "Two",
			description: "This is item two",
			author: "Richard DiZerega",
			modifiedDate: "4/11/2016",
			isNew: false,
			isUnseen: true,
            isFavorite: false
		},
		{
			title: "Three",
			description: "This is item three",
			author: "Santa Claus",
			modifiedDate: "5/19/2016",
			isNew: false,
			isUnseen: false,
            isFavorite: false
		}
	];
}

function createSampleScript(id, name, script) {
    return {
        id: id,
        name: name,
        script: script
    };
}