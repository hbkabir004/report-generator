const questions = [
    {
        id: 1,
        question: 'Möchtest Du lieber in Teil- oder in Vollzeit arbeiten?',
        options: [
            { text: 'Teilzeit', nextQuestionId: 2 },
            { text: 'Vollzeit', nextQuestionId: 2 },
        ],
        title: true
    },
    {
        id: 2,
        question: 'Hast Du eine abgeschlossene Ausbildung als MFA?',
        options: [
            { text: '✅  Ja klar!', nextQuestionId: 3 },
            { text: '❌  Leider nicht', nextQuestionId: 20 },
        ],
    },
    {
        id: 3,
        question: 'Wieviele Jahre Berufserfahrung bringst Du mit?',
        options: [
            { text: '1-4 Jahre', nextQuestionId: 20 },
            { text: '5-10 Jahre', nextQuestionId: 4 },
            { text: '11-15 Jahre', nextQuestionId: 4 },
            { text: '16 und mehr Jahre', nextQuestionId: 4 },
        ],
    },
    {
        id: 4,
        question: 'Wie würdest Du Deine Deutsch-Kenntnisse in Wort und Schrift beurteilen?',
        options: [
            { text: 'Muttersprachlich', nextQuestionId: null },
            { text: 'Fließend', nextQuestionId: null },
            { text: 'Verhandlungssicher', nextQuestionId: 20 },
            { text: 'Grundkenntnisse', nextQuestionId: 20 },
            { text: "Ich spreche kein deutsch / I don't speak german", nextQuestionId: 20 },
        ],
    },
    {
        id: 20,
        text1: 'Wie würdest Du Deine Deutsch-Kenntnisse in Wort und Schrift beurteilen?',
        text2: 'Für unsere offenen Positionen (m/w/d) sind gewisse Qualifikationen erforderlich.',
        text3: 'Teile die Anzeige gerne mit Deinen Freunden, um uns bei der Suche zu unterstützen.',
        text4: 'Dein Team von der Praxis Dr. Georgiadis!',
        img: 'https://i.ibb.co.com/6tTdq22/sm2x.jpg',
        image: true

    },
];

export default questions;