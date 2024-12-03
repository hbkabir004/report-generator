import { cn } from "@/lib/utils";
import { useState } from 'react';
import AnimatedGradientText from './ui/animated-gradient-text';
import PulsatingButton from "./ui/pulsating-button";
import ShineBorder from './ui/shine-border';

const Form = () => {
    const questions = [
        {
            id: 1,
            question: 'Möchtest Du lieber in Teil- oder in Vollzeit arbeiten?',
            options: [
                { text: 'Teilzeit', nextQuestionId: 2 },
                { text: 'Vollzeit', nextQuestionId: 2 },
            ],
            title: 'Los geht´s mit der ersten Frage!'
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
                { text: 'Muttersprachlich', nextQuestionId: 5 },
                { text: 'Fließend', nextQuestionId: 5 },
                { text: 'Verhandlungssicher', nextQuestionId: 20 },
                { text: 'Grundkenntnisse', nextQuestionId: 20 },
                { text: "Ich spreche kein deutsch / I don't speak german", nextQuestionId: 20 },
            ],
        },
        {
            id: 5,
            question: '✅ Worauf freust Du Dich am meisten?',
            options: [
                { text: '🪙  Überdurchschnittliche Vergütung zzgl. Boni', nextQuestionId: null },
                { text: '✈️ 30 Tage Urlaub', nextQuestionId: null },
                { text: '🕒 3 freie Nachmittage und die Option auf eine 4 Tage Woche', nextQuestionId: null },
                { text: '📔 Tolle Fort- und Weiterbildungsmöglichkeiten', nextQuestionId: null },
                { text: "👥 Ein familiäres Team, in dem Deine Leistungen wertgeschätzt werden", nextQuestionId: null },
            ],
            subtitle: '(Mehrfachauswahl möglich)'
        },
        {
            id: 6,
            question: 'Wann können wir Dich am besten erreichen?',
            options: [
                { text: '🕛 Zwischen 8-12 Uhr.', nextQuestionId: null },
                { text: '🕛 Zwischen 12-14 Uhr.', nextQuestionId: null },
                { text: '🕛 Zwischen 14-17 Uhr.', nextQuestionId: null },
                { text: '🕛 Zwischen 17-19 Uhr.', nextQuestionId: null },
            ],
            title: 'Fast geschafft: Letzte Frage!'
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

    const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    console.log(selectedTime);


    const handleOptionSelect = (optionText: string, nextQuestionId: number | null) => {
        if (currentQuestionId === 5) {
            // Multiple selection logic for question 5
            setSelectedOptions((prevSelected) =>
                prevSelected.includes(optionText)
                    ? prevSelected.filter((item) => item !== optionText)
                    : [...prevSelected, optionText]
            );
        } else if (currentQuestionId === 6) {
            // Store selected time and complete the quiz
            setSelectedTime(optionText);
            alert(`Selected time: ${optionText}`);
            setCurrentQuestionId(1); // Reset or navigate as needed
        } else {
            // Default single-selection logic
            if (!nextQuestionId) {
                alert('Quiz Complete!');
                setCurrentQuestionId(1); // Reset quiz
                return;
            }

            // Transition logic
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentQuestionId(nextQuestionId);
                setIsTransitioning(false);
            }, 300);
        }
    };



    const currentQuestion = questions.find((q) => q.id === currentQuestionId);


    return (
        <>
            {(!currentQuestion?.image) &&
                <ShineBorder
                    className="mx-auto px-[13%] py-[8%] bg-white overflow-hidden rounded-lg border bg-background md:shadow-xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div className="text-center">
                        {/* Question */}
                        <div
                            className={`w-[500px] inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0 translate-y-20' : 'opacity-100 translate-x-0'
                                }`}
                        >

                            {(currentQuestion?.title) &&
                                <AnimatedGradientText>
                                    <h1 className={cn(
                                        `inline animate-gradient bg-gradient-to-r from-[#206396] via-[#5cd1ee] to-[#206396] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-3xl font-semibold mb-8`,
                                    )}>{currentQuestion?.title}</h1>
                                </AnimatedGradientText>
                            }

                            {(currentQuestion?.question) && <AnimatedGradientText>
                                <h2
                                    className={cn(
                                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-3xl font-semibold mb-6`,
                                    )}
                                >
                                    {currentQuestion.question}
                                </h2>
                            </AnimatedGradientText>
                            }

                            {
                                (currentQuestion?.subtitle) && <h2 className="text-xl pb-4">(Mehrfachauswahl möglich)</h2>
                            }

                            {currentQuestion?.options &&
                                <div className="mt-4 space-y-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleOptionSelect(option.text, option.nextQuestionId)}
                                            className={cn(
                                                "block text-xl w-full text-left py-2 px-4 rounded-sm transition-transform duration-300 mb-3 font-medium",
                                                {
                                                    "bg-gray-200 text-[#206396] hover:bg-[#206396] hover:text-white hover:scale-105":
                                                        currentQuestionId !== 5 || !selectedOptions.includes(option.text),
                                                    "bg-[#206396] text-white scale-105": currentQuestionId === 5 && selectedOptions.includes(option.text),
                                                }
                                            )}
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            }

                            {currentQuestionId === 5 && (
                                <button
                                    onClick={() => {
                                        if (selectedOptions.length === 0) {
                                            alert('Bitte wähle mindestens eine Option aus.'); // Alert if no options selected
                                            return;
                                        }
                                        setCurrentQuestionId(6); // Move to the next question
                                    }}
                                    className="mt-8 text-xl"
                                >
                                    <PulsatingButton>
                                        Zur letzten Frage! 🏁
                                    </PulsatingButton>
                                </button>
                            )}
                        </div>
                    </div>
                </ShineBorder >}

            {(currentQuestion?.image) &&
                <ShineBorder className="mx-auto px-[10%] py-[2%] bg-white overflow-hidden rounded-lg border bg-background md:shadow-xl text-center"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                    <div className={`inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0 translate-y-20' : 'opacity-100 translate-x-0'}`}>
                        <AnimatedGradientText>
                            <h1
                                className={cn(
                                    `block animate-gradient bg-gradient-to-r from-[#206396] via-[#5cd1ee] to-[#206396] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-2xl font-semibold mb-8`,
                                )}>{currentQuestion.text1}</h1>
                        </AnimatedGradientText>

                        <AnimatedGradientText>
                            <h1
                                className={cn(
                                    `block animate-gradient bg-gradient-to-r from-[#206396] via-[#5cd1ee] to-[#206396] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-2xl font-semibold mb-8`,
                                )}>{currentQuestion.text2}</h1>
                        </AnimatedGradientText>

                        <AnimatedGradientText>
                            <h1
                                className={cn(
                                    `block animate-gradient bg-gradient-to-r from-[#206396] via-[#5cd1ee] to-[#206396] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-2xl font-semibold mb-8`,
                                )}>{currentQuestion.text3}</h1>
                        </AnimatedGradientText>
                        <AnimatedGradientText>
                            <h1
                                className={cn(
                                    `block animate-gradient bg-gradient-to-r from-[#206396] via-[#5cd1ee] to-[#206396] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-2xl font-semibold mb-8`,
                                )}>{currentQuestion.text4}</h1>
                        </AnimatedGradientText>

                        <div className="flex justify-center items-center">
                            <img className="w-3/5" src={currentQuestion.img} alt="group-image" />
                        </div>

                    </div>
                </ShineBorder>
            }
        </>
    );
};

export default Form;
