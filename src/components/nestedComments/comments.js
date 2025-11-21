const comments = [
    {
        id: 1,
        comment: "This boss fight was insane!",
        replies: [
            {
                id: 2,
                comment: "Right? Took me 3 tries to beat it!",
                replies: [
                    {
                        id: 5,
                        comment: "I gave up after 2 hours",
                        replies: [],
                    },
                ],
            },
            {
                id: 3,
                comment: "The graphics are next level!",
                replies: [],
            },
        ],
    },
    {
        id: 4,
        comment: "Anyone else notice the hidden Easter egg in level 3?",
        replies: [
            {
                id: 6,
                comment: "Yes! Took me forever to find it lol",
                replies: [],
            },
        ],
    },
    {
        id: 7,
        comment: "Can't wait for the DLC next month!",
        replies: [],
    },
];

export default comments;
