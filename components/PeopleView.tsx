
import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Star, MoreHorizontal } from 'lucide-react';

const CONTACTS = [
    { id: '1', name: 'Vladimir Putin', email: 'vlad@kremlin.ru', role: 'President of Russia', avatar: 'https://ui-avatars.com/api/?name=Vladimir+Putin&background=000&color=fff', phone: '+7 999 000 000', location: 'Moscow, Russia', status: 'Riding a Bear' },
    { id: '2', name: 'Kim Jong Un', email: 'rocketman@pyongyang.kp', role: 'Supreme Leader', avatar: 'https://ui-avatars.com/api/?name=Kim+Jong+Un&background=000&color=fff', phone: '+850 000 111', location: 'Pyongyang, DPRK', status: 'Watching NBA Replays' },
    { id: '3', name: 'Mamdami', email: 'mamdami@secretchannel.com', role: 'Mayor of NYC (Parody)', avatar: 'https://ui-avatars.com/api/?name=Mamdami&background=ff0000&color=fff', phone: '+1 212 555 0199', location: 'The Subway, NYC', status: 'Checking the Vibes' },
    { id: '4', name: 'Benjamin Netanyahu', email: 'bibi@prime.il', role: 'Prime Minister', avatar: 'https://ui-avatars.com/api/?name=Benjamin+Netanyahu&background=0038b8&color=fff', phone: '+972 50 000 000', location: 'Jerusalem', status: 'Drawing Red Lines' },
    { id: '5', name: 'Melania Trump', email: 'flotus@closelook.com', role: 'First Lady', avatar: 'https://ui-avatars.com/api/?name=Melania&background=ffd700&color=000', phone: 'Unlisted', location: 'Palm Beach, FL', status: 'Hating Christmas' },
    { id: '6', name: 'Barron Trump', email: 'cyber@expert.com', role: 'The Cyber Expert', avatar: 'https://ui-avatars.com/api/?name=Barron&background=000000&color=fff', phone: 'Unlisted', location: 'Gaming Room', status: 'Yield Farming' },
    { id: '7', name: 'Elon Musk', email: 'e@x.com', role: 'Tech Mogul', avatar: 'https://ui-avatars.com/api/?name=Elon+Musk&background=000&color=fff', phone: '+1 310 555 1010', location: 'Mars (Soon)', status: 'Tweeting' },
    { id: '8', name: 'Snoop Dogg', email: 'dogg@lbc.com', role: 'Rapper / Chef', avatar: 'https://ui-avatars.com/api/?name=Snoop+Dogg&background=333&color=fff', phone: '+1 213 420 0420', location: 'Long Beach, CA', status: 'Cooking with Martha' },
    { id: '9', name: 'King Charles', email: 'hrh@royal.uk', role: 'King of UK', avatar: 'https://ui-avatars.com/api/?name=King+Charles&background=purple&color=fff', phone: '+44 20 7930 4832', location: 'London, UK', status: 'Waiting for Tea' },
    { id: '10', name: 'Xi Jinping', email: 'pooh@beijing.cn', role: 'President of China', avatar: 'https://ui-avatars.com/api/?name=Xi+Jinping&background=red&color=yellow', phone: '+86 10 0000 0000', location: 'Beijing, China', status: 'Counting Pandas' },
    { id: '11', name: 'George Santos', email: 'george@truth.com', role: 'Astronaut / Volleyball Star', avatar: 'https://ui-avatars.com/api/?name=George+Santos&background=pink&color=fff', phone: '+1 555 123 4567', location: 'Everywhere', status: 'Inventing Things' },
    { id: '12', name: 'Tucker Carlson', email: 'tucker@x.com', role: 'Journalist', avatar: 'https://ui-avatars.com/api/?name=Tucker+Carlson&background=000080&color=fff', phone: '+1 202 555 9999', location: 'Maine woods', status: 'Laughing hysterically' },
    { id: '13', name: 'Ivanka Trump', email: 'ivanka@brand.com', role: 'Advisor', avatar: 'https://ui-avatars.com/api/?name=Ivanka&background=FF69B4&color=fff', phone: '+1 202 555 0100', location: 'Miami, FL', status: 'Patenting Phrases' },
    { id: '14', name: 'Jared Kushner', email: 'jared@techsupport.gov', role: 'Everything Solver', avatar: 'https://ui-avatars.com/api/?name=Jared+K&background=cccccc&color=000', phone: '+1 202 555 0101', location: 'Miami, FL', status: 'Fixing Servers' },
    { id: '15', name: 'Greta Thunberg', email: 'howdareyou@climate.se', role: 'Activist', avatar: 'https://ui-avatars.com/api/?name=Greta+Thunberg&background=008000&color=fff', phone: '+46 000 123', location: 'Stockholm', status: 'Saving Bees' },
    { id: '16', name: 'Bernie Sanders', email: 'bernie@mitten.gov', role: 'Senator', avatar: 'https://ui-avatars.com/api/?name=Bernie+Sanders&background=A52A2A&color=fff', phone: '+1 802 555 9999', location: 'Vermont', status: 'Looking for Mittens' },
    { id: '17', name: 'Mark Zuckerberg', email: 'zuck@meta.com', role: 'CEO', avatar: 'https://ui-avatars.com/api/?name=Mark+Zuckerberg&background=1877F2&color=fff', phone: '10101010', location: 'Metaverse', status: 'Charging...' },
    { id: '18', name: 'Oprah Winfrey', email: 'giveaway@o.com', role: 'Queen of Media', avatar: 'https://ui-avatars.com/api/?name=Oprah+W&background=800080&color=fff', phone: '+1 310 555 4444', location: 'Montecito', status: 'Giving Things Away' },
    { id: '19', name: 'Ye (Kanye)', email: 'ye@yeezy.com', role: 'Creative Genius', avatar: 'https://ui-avatars.com/api/?name=Kanye+West&background=000&color=fff', phone: '+1 310 000 0001', location: 'Wyoming', status: 'Designing Helmets' },
    { id: '20', name: 'Taylor Swift', email: 'taylor@13.com', role: 'Music Industry', avatar: 'https://ui-avatars.com/api/?name=Taylor+Swift&background=ff69b4&color=fff', phone: '+1 615 131 3131', location: 'Private Jet', status: 'Writing Songs' },
    { id: '21', name: 'Jeff Bezos', email: 'jeff@amazon.com', role: 'Space Cowboy', avatar: 'https://ui-avatars.com/api/?name=Jeff+Bezos&background=ff9900&color=000', phone: 'Alexa, call Jeff', location: 'Yacht', status: 'Spending Billions' },
    { id: '22', name: 'Santa Claus', email: 'nick@northpole.org', role: 'Toy Distributor', avatar: 'https://ui-avatars.com/api/?name=Santa+Claus&background=red&color=fff', phone: 'Ho Ho Ho', location: 'North Pole', status: 'Checking Lists' },
    { id: '23', name: 'The Devil', email: 'lucifer@hell.com', role: 'CEO of Down Under', avatar: 'https://ui-avatars.com/api/?name=Satan&background=000&color=red', phone: '666-666-6666', location: 'Georgia', status: 'Buying Souls' },
    { id: '24', name: 'Prince William', email: 'wills@royal.uk', role: 'Heir', avatar: 'https://ui-avatars.com/api/?name=Prince+William&background=000080&color=fff', phone: '+44 20 7930 0000', location: 'Windsor', status: 'Polishing Head' },
    { id: '25', name: 'Justin Trudeau', email: 'jt@canada.ca', role: 'PM of Canada', avatar: 'https://ui-avatars.com/api/?name=Justin+Trudeau&background=ff0000&color=fff', phone: '+1 613 000 0000', location: 'Ottawa', status: 'Apologizing' },
];

const PeopleView = () => {
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState(CONTACTS[0].id);

    const filtered = CONTACTS.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    const selectedContact = CONTACTS.find(c => c.id === selectedId);

    return (
        <div className="flex-1 flex bg-white h-full">
            {/* Sidebar List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Contacts</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 rounded px-9 py-2 text-sm outline-none transition-all"
                            placeholder="Search contacts"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filtered.map(contact => (
                        <div 
                            key={contact.id}
                            onClick={() => setSelectedId(contact.id)}
                            className={`flex items-center gap-3 p-3 cursor-pointer border-l-4 transition-colors ${selectedId === contact.id ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}
                        >
                            <div className="relative">
                                <img src={contact.avatar} className="w-10 h-10 rounded-full" alt={contact.name} />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-gray-900 truncate">{contact.name}</div>
                                <div className="text-xs text-gray-500 truncate">{contact.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            {selectedContact ? (
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-2xl mx-auto bg-white">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-6">
                                <img src={selectedContact.avatar} className="w-24 h-24 rounded-full shadow-lg" alt={selectedContact.name} />
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{selectedContact.name}</h1>
                                    <p className="text-lg text-gray-500">{selectedContact.role}</p>
                                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        {selectedContact.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-yellow-500"><Star className="h-6 w-6" /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-blue-600"><MoreHorizontal className="h-6 w-6" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-blue-600">
                                    <Mail className="h-5 w-5" />
                                    <span className="text-sm font-medium uppercase">Email</span>
                                </div>
                                <div className="text-gray-900 font-medium">{selectedContact.email}</div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-blue-600">
                                    <Phone className="h-5 w-5" />
                                    <span className="text-sm font-medium uppercase">Mobile</span>
                                </div>
                                <div className="text-gray-900 font-medium">{selectedContact.phone}</div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-blue-600">
                                    <MapPin className="h-5 w-5" />
                                    <span className="text-sm font-medium uppercase">Location</span>
                                </div>
                                <div className="text-gray-900 font-medium">{selectedContact.location}</div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Recent Interactions</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Sent email: "Secret Summit Plan"</p>
                                        <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Missed call</p>
                                        <p className="text-xs text-gray-500">Monday at 10:15 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">Select a contact</div>
            )}
        </div>
    );
};

export default PeopleView;
