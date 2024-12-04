import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import PulsatingButton from "./ui/pulsating-button";
import ShineBorder from './ui/shine-border';


type UserDetails = {
    name: string;
    email: string;
    phone: string;
};

const UsingPhoneInput2 = () => {
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
                { text: '🟡  Überdurchschnittliche Vergütung zzgl. Boni', nextQuestionId: null },
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
            id: 10,
            title: 'Vielen Dank für Deine Bewerbung. Wir freuen uns darauf Dich kennenzulernen.',
            text1: 'So geht es jetzt weiter:',
            text2: 'Wir sehen uns Deine Bewerbung an und melden uns innerhalb der nächsten 48 Stunden telefonisch bei Dir.',
            text3: 'Speicher Dir dafür gerne schon einmal die folgenden Nummern ein, denn unter einer der drei werden wir Dich kontaktieren:',
            text4: '+49 151 51589830',
            text5: '+49 151 25006663',
            text6: '+49 160 96703175',
            text7: 'Gemeinsam vereinbaren wir einen Termin für ein unverbindliches Kennenlerngespräch.',
            text8: 'Beim Kennenlernen kannst uns alle Fragen stellen, die Du gerne beantwortet haben möchtest.',
            text9: 'Deine Ansprechpartnerin:',
            text10: 'Jasemin Bergmann',
            img: 'https://i.ibb.co.com/6tTdq22/sm2x.jpg',
            thankyou: true

        },
        {
            id: 20,
            text1: 'Wie würdest Du Deine Deutsch-Kenntnisse in Wort und Schrift beurteilen? 🙂',
            text2: 'Für unsere offenen Positionen (m/w/d) sind gewisse Qualifikationen erforderlich.',
            text3: 'Teile die Anzeige gerne mit Deinen Freunden, um uns bei der Suche zu unterstützen. 📲',
            text4: 'Dein Team von der Praxis Dr. Georgiadis!',
            img: 'https://i.ibb.co.com/6tTdq22/sm2x.jpg',
            image: true

        },
    ];

    const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const defaultUserDetails: UserDetails = {
        name: '',
        email: '',
        phone: '',
    };

    const [userDetails, setUserDetails] = useState<UserDetails>(defaultUserDetails);

    const [value, setValue] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('bd');
    const [ipAddress, setIpAddress] = useState<string>('');

    useEffect(() => {
        const fetchUserIPAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
                setIpAddress('103.204.211.42'); // Default IP
            }
        };
        fetchUserIPAddress();
    }, []);

    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                const data = await response.json();
                setCountryCode(data.country_code.toLowerCase());
            } catch (error) {
                console.error('Error fetching geolocation data:', error);
                setCountryCode('bd'); // Default to Bangladesh
            }
        };
        if (ipAddress) {
            fetchUserCountry();
        }
    }, [ipAddress]);

     // Extract questions with IDs 1 to 4
     const extractedQuestions = questions
     .filter((q) => q.id >= 1 && q.id <= 4)
     .map((q) => ({
         id: q.id,
         question: q.question,
         options: q.options,
     }));

 const handleOptionSelect = (optionText: string, nextQuestionId: number | null) => {
     if (currentQuestionId === 5) {
         setSelectedOptions((prevSelected) =>
             prevSelected.includes(optionText)
                 ? prevSelected.filter((item) => item !== optionText)
                 : [...prevSelected, optionText]
         );
     } else if (currentQuestionId === 6) {
         setSelectedTime(optionText);
     } else {
         if (!nextQuestionId) {
             alert('Quiz Complete!');
             setCurrentQuestionId(1); // Reset quiz
             return;
         }
         setIsTransitioning(true);
         setTimeout(() => {
             setCurrentQuestionId(nextQuestionId);
             setIsTransitioning(false);
         }, 300);
     }
 };

 const handleSubmit = () => {
     if (!userDetails.name || !userDetails.email || !userDetails.phone) {
         alert('Bitte füllen Sie alle Felder aus.');
         return;
     }

     // Merging data
     const formData = {
         ...selectedOptions,
         selectedTime,
         ...userDetails,
         ...extractedQuestions,
     };

     console.log({formData});
     alert('Danke für Ihre Antworten!');

     // Reset quiz
     setCurrentQuestionId(1);
     setSelectedOptions([]);
     setSelectedTime(null);
     setUserDetails(defaultUserDetails);
 };

 const currentQuestion = questions.find((q) => q.id === currentQuestionId);

 console.log({userDetails});

    return (
        <>
            {!selectedTime && (!currentQuestion?.image) && (
                <ShineBorder
                    className="mx-auto px-[13%] py-[8%] bg-white overflow-hidden rounded-lg border bg-background md:shadow-2xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div className="text-center">
                        <div
                            className={`md:w-[500px] inset-0 transition-all duration-700 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                                }`}
                        >
                            {currentQuestion?.title && (
                                <h1 className="text-[#206396] md:text-3xl text-xl font-semibold mb-8">
                                    {currentQuestion.title}
                                </h1>
                            )}

                            {currentQuestion?.question && (
                                <h2 className="text-[#206396] md:text-3xl text-xl font-semibold mb-6">
                                    {currentQuestion.question}
                                </h2>
                            )}

                            {currentQuestion?.subtitle && (
                                <h2 className="text-xl pb-4">(Mehrfachauswahl möglich)</h2>
                            )}

                            {currentQuestion?.options && (
                                <div className="mt-4 space-y-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleOptionSelect(option.text, option.nextQuestionId)}
                                            className={cn(
                                                "block md:text-xl text-sm w-full text-left py-2 px-4 rounded-sm transition-transform duration-300 ease-in-out mb-3 font-medium",
                                                {
                                                    "bg-gray-200 text-[#206396] hover:bg-[#206396] hover:text-white hover:scale-105":
                                                        currentQuestionId !== 5 || !selectedOptions.includes(option.text),
                                                    "bg-[#206396] text-white scale-105":
                                                        currentQuestionId === 5 && selectedOptions.includes(option.text),
                                                }
                                            )}
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {currentQuestionId === 5 && (
                                <button
                                    onClick={() => {
                                        if (selectedOptions.length === 0) {
                                            alert('Bitte wähle mindestens eine Option aus.');
                                            return;
                                        }
                                        setCurrentQuestionId(6);
                                    }}
                                    className="mt-8 md:text-xl text-sm"
                                >
                                    <PulsatingButton>
                                        Zur letzten Frage! 🏁
                                    </PulsatingButton>
                                </button>
                            )}
                        </div>
                    </div>
                </ShineBorder>
            )}

            {selectedTime && (
                <ShineBorder
                    className="mx-auto px-[13%] py-[8%] bg-white overflow-hidden rounded-lg border bg-background md:shadow-2xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div className="text-center">
                        <h1 className="text-[#206396] md:text-3xl text-xl font-semibold mb-6">
                            Glückwunsch! Du passt super in unser Praxisteam! 🎉
                        </h1>
                        <h5 className="text-xl pb-4">Nun würden wir Dich gern unverbindlich kennenlernen:</h5>
                        <h5 className="text-xl pb-8">Wie können wir Dich am besten erreichen?</h5>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="👋 Dein Voller Name *"
                                value={userDetails.name}
                                onChange={(e) =>
                                    setUserDetails({ ...userDetails, name: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-sm"
                            />
                            <input
                                type="email"
                                placeholder="📧 Deine E-Mail Adresse *"
                                value={userDetails.email}
                                onChange={(e) =>
                                    setUserDetails({ ...userDetails, email: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-sm"
                            />


                            <PhoneInput
                                country={countryCode}
                                value={value}
                                onChange={(phone) => setValue(phone)}
                                inputClass="input-phone-number"
                                placeholder="Enter your phone number"
                            />

                            <h4 className="md:text-xl text-sm py-4 text-[#206396]">
                                🔒 100% sichere Datenverbindung mit SSL. Wir respektieren Deine <br />{" "}
                                Privatsphäre.
                            </h4>

                            <button
                                type="submit"
                                className="mt-10 md:text-xl text-sm"
                            >
                                <PulsatingButton>
                                    Jetzt unverbindliches Kennenlerngespräch vereinbaren! 📩
                                </PulsatingButton>
                            </button>
                        </form>
                    </div>
                </ShineBorder>
            )}

            {currentQuestion?.image && (
                <ShineBorder
                    className="mx-auto px-[10%] py-[2%] bg-white overflow-hidden rounded-lg border bg-background md:shadow-xl text-center"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div
                        className={`inset-0 transition-all duration-700 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                            }`}
                    >
                        <h1 className="text-[#206396] md:text-2xl text-lg font-semibold mb-8">
                            {currentQuestion.text1}
                        </h1>

                        <h1 className="text-[#206396] md:text-2xl text-lg font-semibold mb-8">
                            {currentQuestion.text2}
                        </h1>

                        <h1 className="text-[#206396] md:text-2xl text-lg font-semibold mb-8">
                            {currentQuestion.text3}
                        </h1>

                        <h1 className="text-[#206396] md:text-2xl text-lg font-semibold mb-8">
                            {currentQuestion.text4}
                        </h1>

                        <div className="flex justify-center items-center">
                            <img
                                className="w-3/5"
                                src={currentQuestion.img}
                                alt="group-image"
                            />
                        </div>
                    </div>
                </ShineBorder>
            )}
            {currentQuestion?.thankyou && (
                <ShineBorder
                    className="mx-auto px-[10%] py-[2%] bg-white overflow-hidden rounded-lg border bg-background md:shadow-xl text-center"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div
                        className={`inset-0 transition-all duration-700 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                            }`}
                    >
                        <h1 className="text-[#206396] md:text-2xl text-lg font-semibold mb-8">
                            {currentQuestion.title}
                        </h1>

                        <p>{currentQuestion.text1}</p>
                        <p>{currentQuestion.text2}</p>
                        <p>{currentQuestion.text3}</p>
                        <p>{currentQuestion.text4}</p>
                        <p>{currentQuestion.text5}</p>
                        <p>{currentQuestion.text6}</p>
                        <p>{currentQuestion.text7}</p>
                        <p>{currentQuestion.text8}</p>
                        <p>{currentQuestion.text9}</p>
                        <p>{currentQuestion.text10}</p>

                        <div className="flex justify-center items-center">
                            <img
                                className="w-1/2"
                                src={currentQuestion.img}
                                alt="group-image"
                            />
                        </div>
                    </div>
                </ShineBorder>
            )}
        </>
    );
};

export default UsingPhoneInput2;
