
import { Email, FolderType, Meeting } from './types';
import { subHours, subDays, addHours, addDays, setHours, setMinutes } from 'date-fns';

const CURRENT_USER = {
  name: 'Donald J.',
  email: 'boss@closelook.com',
  avatar: 'https://ui-avatars.com/api/?name=Donald+Trump&background=0078D4&color=fff&size=128'
};

export const MOCK_EMAILS: Email[] = [
  {
    id: 'jd_vance_couch',
    folder: FolderType.Inbox,
    from: { name: 'JD Vance', email: 'jd.vance@vp.gov', avatar: 'https://ui-avatars.com/api/?name=JD+Vance&background=003366&color=fff' },
    to: [CURRENT_USER],
    subject: 'Couch update',
    snippet: 'Just left the Residence furniture inventory meeting...',
    body: `Sir,

Just left the Residence furniture inventory meeting. The new couch arrived. Leather, no cushions that can be removed and… reinterpreted.

I personally tested it for 45 minutes. Zero rumors possible. You're welcome.

Also, the staff asked if we still need the plastic slipcover from 2017. I said yes.

Your loyal furniture defender,

JD

P.S. Fox just ran the chyron "VANCE CLEARS COUCH." Historic victory.`,
    date: subHours(new Date(), 0.005).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'melania_epstein',
    folder: FolderType.Inbox,
    from: { name: 'Melania Trump', email: 'melania@trump.com', avatar: 'https://ui-avatars.com/api/?name=Melania+Trump&background=ffd700&color=000' },
    to: [CURRENT_USER],
    subject: 'Donald what is ihtis',
    snippet: 'Donald,Explain.Melania',
    body: `Donald,

Explain.

Melania`,
    date: subHours(new Date(), 0.01).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'ye1',
    folder: FolderType.Inbox,
    from: { name: 'Ye', email: 'ye@yeezy.com', avatar: 'https://ui-avatars.com/api/?name=Kanye+West&background=000&color=fff' },
    to: [CURRENT_USER],
    subject: 'FISH STICKS',
    snippet: 'THEY DONT GET IT DONALD...',
    body: `DONALD

THEY TRYING TO TELL ME I LIKE FISH STICKS.

I AM A GENIUS. I AM THE VOICE OF A GENERATION. 

DO YOU LIKE FISH STICKS? 

WE NEED TO BAN SOUTH PARK. 

ALSO I REDESIGNED THE MAGA HAT. IT IS NOW A DIAMOND ENCRUSTED HELMET. 

YE`,
    date: subHours(new Date(), 0.05).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: true,
    categories: ['Red Category']
  },
  {
    id: 'taylor1',
    folder: FolderType.Inbox,
    from: { name: 'Taylor Swift', email: 'taylor@13.com', avatar: 'https://ui-avatars.com/api/?name=Taylor+Swift&background=ff69b4&color=fff' },
    to: [CURRENT_USER],
    subject: 'Song about you?',
    snippet: 'I was thinking of writing a song...',
    body: `Mr. President,

I was thinking of writing a song about our interactions.

Working titles:
1. "Bad Hombres & Broken Hearts"
2. "Wall of Tears"
3. "We Are Never Ever Getting Mexico To Pay For It"

Let me know which one you vibe with.

Best,
Tay`,
    date: subHours(new Date(), 0.08).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: false,
    categories: ['Blue Category']
  },
  {
    id: 'greta1',
    folder: FolderType.Inbox,
    from: { name: 'Greta', email: 'howdareyou@climate.se', avatar: 'https://ui-avatars.com/api/?name=Greta+Thunberg&background=008000&color=fff' },
    to: [CURRENT_USER],
    subject: 'How dare you touch the thermostat',
    snippet: 'I can see the energy usage from Sweden...',
    body: `Mr. Trump,

How dare you set the Oval Office AC to 68 degrees?

I can see the energy spike from Sweden. You are melting the ice caps personally.

Put on a sweater. 

The eyes of future generations are upon you (and your thermostat).

- Greta`,
    date: subHours(new Date(), 0.1).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Green Category']
  },
  {
    id: 'bibi1',
    folder: FolderType.Inbox,
    from: { name: 'Bibi', email: 'bibi@prime.il', avatar: 'https://ui-avatars.com/api/?name=Benjamin+Netanyahu&background=0038b8&color=fff' },
    to: [CURRENT_USER],
    subject: 'The PowerPoint for the Summit',
    snippet: 'Donald, the red line animation is stuck...',
    body: `Donald,

I am working on my presentation for the Mamdami summit.

I have a slide with a bomb and a red line. It is classic. But the animation is lagging.

Also, I need a laser pointer. Not a regular one. A space laser. You know the one Ivanka talks about? I need to point at the hummus very aggressively.

Shalom,
Bibi`,
    date: subHours(new Date(), 0.2).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: true,
    categories: ['Red Category']
  },
  {
    id: 'bezos1',
    folder: FolderType.Inbox,
    from: { name: 'Jeff Bezos', email: 'jeff@amazon.com', avatar: 'https://ui-avatars.com/api/?name=Jeff+Bezos&background=ff9900&color=000' },
    to: [CURRENT_USER],
    subject: 'Washington Post for sale?',
    snippet: 'Thinking of selling. You interested?...',
    body: `Donald,

I'm bored with the newspaper business. Too many words. Not enough rockets.

Do you want to buy the Washington Post? 

I will trade it for a permit to build a warehouse on the National Mall.

Let me know. Alexa is listening.

Jeff`,
    date: subHours(new Date(), 0.25).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'elon_mars',
    folder: FolderType.Inbox,
    from: { name: 'Elon', email: 'e@x.com', avatar: 'https://ui-avatars.com/api/?name=Elon+Musk&background=000&color=fff' },
    to: [CURRENT_USER],
    subject: 'Mars Colony Beta Testing',
    snippet: 'D, I put you on the list for the first flight...',
    body: `D,

I put you on the list for the first Starship flight to Mars. 

It is a one-way ticket. Just kidding (maybe). 

We need a President of Mars. The title comes with a cybertruck and a flamethrower.

Also, can I borrow a nuke? I need to warm up the polar ice caps. NASA won't return my calls.

- Elon`,
    date: subHours(new Date(), 0.3).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Blue Category']
  },
  {
    id: 'santa1',
    folder: FolderType.Junk,
    from: { name: 'Santa Claus', email: 'nick@northpole.org', avatar: 'https://ui-avatars.com/api/?name=Santa+Claus&background=red&color=fff' },
    to: [CURRENT_USER],
    subject: 'Naughty List Notification',
    snippet: 'This is an automated notification...',
    body: `Dear Donald,

This is an automated notification from the North Pole Department of Corrections.

Your status has been updated to: PERMANENTLY NAUGHTY.

Reason: "Hoarding Diet Coke" and "Tweeting after midnight".

To appeal this decision, please leave better cookies this year. Store bought cookies are an insult.

Regards,
St. Nick`,
    date: subHours(new Date(), 0.32).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'bernie1',
    folder: FolderType.Inbox,
    from: { name: 'Bernie', email: 'bernie@mitten.gov', avatar: 'https://ui-avatars.com/api/?name=Bernie+Sanders&background=A52A2A&color=fff' },
    to: [CURRENT_USER],
    subject: 'I am once again asking',
    snippet: 'I am once again asking for your lunch money...',
    body: `Donald,

I am once again asking for your financial support.

Not for a campaign. I left my wallet at the deli. 

Also, did you steal my mittens? The ones made from recycled plastic bottles? I saw them on your desk.

The top 1% of mitten owners control 90% of the warmth. It is unacceptable.

Bernie`,
    date: subHours(new Date(), 0.35).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'kim1',
    folder: FolderType.Inbox,
    from: { name: 'Kim J.', email: 'rocketman@pyongyang.kp', avatar: 'https://ui-avatars.com/api/?name=Kim+Jong+Un&background=000&color=fff' },
    to: [CURRENT_USER],
    subject: 'Netflix Password?',
    snippet: 'D-Man, my account is locked...',
    body: `D-Man,

My Netflix is locked again. It says "Too many households". 

Is Dennis Rodman using my account? I bet it is Dennis.

Please share your password. I need to watch "Squid Game". It is a documentary about my management style.

Also, did you get the Elton John CD?

- Rocket Man`,
    date: subHours(new Date(), 0.4).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Orange Category']
  },
  {
    id: 'snoop1',
    folder: FolderType.Inbox,
    from: { name: 'Snoop Dogg', email: 'dogg@lbc.com', avatar: 'https://ui-avatars.com/api/?name=Snoop+Dogg&background=333&color=fff' },
    to: [CURRENT_USER],
    subject: 'Yo unc',
    snippet: 'I need another pardon, I parked in a red zone...',
    body: `Yo Unc,

Hope you chillin.

I need a favor. I parked my lowrider in a red zone outside the White House. They towing it.

Can you write me a pardon? Or just tell the Secret Service to wash it while they have it?

Peace and Love,
Snoop`,
    date: subHours(new Date(), 0.45).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: ['Green Category']
  },
  {
    id: 'satan1',
    folder: FolderType.Inbox,
    from: { name: 'The Devil', email: 'lucifer@hell.com', avatar: 'https://ui-avatars.com/api/?name=Satan&background=000&color=red' },
    to: [CURRENT_USER],
    subject: 'Contract Renewal',
    snippet: 'Hey D, just checking in on the renewal...',
    body: `Hey D,

Just checking in on your contract renewal. 

You've had a great run. The hair, the towers, the presidency. It all came at a price, remember?

We need to sign the extension by midnight. The terms are the same: you get fame, I get... well, you know.

See you soon (but hopefully not too soon),
Lucy`,
    date: subHours(new Date(), 0.46).toISOString(),
    read: true,
    flagged: true,
    hasAttachments: true,
    categories: ['Red Category']
  },
  {
    id: 'zuck1',
    folder: FolderType.Inbox,
    from: { name: 'Mark Z.', email: 'zuck@meta.com', avatar: 'https://ui-avatars.com/api/?name=Mark+Zuckerberg&background=1877F2&color=fff' },
    to: [CURRENT_USER],
    subject: 'Do you like my legs?',
    snippet: 'We finally rendered legs in the metaverse...',
    body: `Donald,

Great news. We have achieved leg rendering in the Metaverse.

It took 4,000 engineers and $10 billion, but I now have knees.

I have created a "MAGA Verse" just for you. The walls are gold and there are no fact-checkers. 

Please join. I am lonely in here. It is just me and Nick Clegg's avatar.

- Mark`,
    date: subHours(new Date(), 0.48).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: true,
    categories: ['Blue Category']
  },
  {
    id: 'barron_poly',
    folder: FolderType.Inbox,
    from: { name: 'Barron (DeFi)', email: 'whale@polymarket.eth', avatar: 'https://ui-avatars.com/api/?name=Barron+Trump&background=000000&color=fff' },
    to: [CURRENT_USER],
    subject: 'Polymarket variance is annoying me',
    snippet: 'Father, I need you to tweet something...',
    body: `Father.

I have deployed significant capital into the "Will you wear a red tie?" market on Polymarket.

The odds are currently 60/40. This variance is unacceptable for my strategy. I am trying to yield farm the election volatility.

Please tweet "Red Tie" at 4:00 PM. 

Also, tell Melania to stop buying the "Blue Tie" shares. She is squeezing my position. 

If this trade fails, I will have to sell the Minecraft server.

B`,
    date: subHours(new Date(), 0.5).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Green Category']
  },
  {
    id: 'macron1',
    folder: FolderType.Inbox,
    from: { name: 'Emmanuel M.', email: 'manu@elysee.fr', avatar: 'https://ui-avatars.com/api/?name=Emmanuel+Macron&background=002654&color=fff' },
    to: [CURRENT_USER],
    subject: 'Handshake Training',
    snippet: 'I have been squeezing rocks...',
    body: `Mon ami Donald,

I am preparing for our handshake at the summit.

I have been squeezing rocks for 6 weeks. My grip strength is 9000 PSI. 

Do not try the "pull and yank" move on me. I am anchored to the floor with French heavy boots.

Prepare yourself.

Manu`,
    date: subHours(new Date(), 0.8).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: ['Blue Category']
  },
  {
    id: '1',
    folder: FolderType.Inbox,
    from: { name: 'Mamdami', email: 'mamdami@secretchannel.com', avatar: 'https://ui-avatars.com/api/?name=Mamdami&background=ff0000&color=fff' },
    to: [CURRENT_USER],
    subject: 'URGENT: The date? 20. or 21. November?',
    snippet: 'Donald, the secret summit needs a date...',
    body: `Donald,

We need to finalize the date for the "Super Secret Summit". 

My astrologer says the 20th is bad energy, but the 21st is aligned with the moon. 

Also, the shipment of 500 Diet Cokes arrives on the morning of the 21st. If we do the 20th, we will have to drink water. Like commoners.

Please advise immediately.

Yours in secrecy,
Mamdami`,
    date: subHours(new Date(), 1).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: true,
    categories: ['Red Category']
  },
  {
    id: 'william1',
    folder: FolderType.Inbox,
    from: { name: 'Prince William', email: 'wills@royal.uk', avatar: 'https://ui-avatars.com/api/?name=Prince+William&background=000080&color=fff' },
    to: [CURRENT_USER],
    subject: 'Hair Advice',
    snippet: 'Donald, strictly between us...',
    body: `Donald,

Strictly between us heirs to power.

Who is your guy?

I have tried everything. The royal lotions, the druid chants. Nothing works. The shiny spot grows larger every day.

Harry makes fun of me. 

Please share your secrets. Is it glue? Is it magic?

W`,
    date: subHours(new Date(), 1.05).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'charles_tea',
    folder: FolderType.Inbox,
    from: { name: 'King Charles', email: 'hrh@royal.uk', avatar: 'https://ui-avatars.com/api/?name=King+Charles&background=purple&color=fff' },
    to: [CURRENT_USER],
    subject: 'The Tea Situation',
    snippet: 'Donald, one hears disturbing rumors...',
    body: `Donald,

One hears disturbing rumors from the embassy.

Is it true you microwave your tea?

This is an act of aggression against the Crown. It is barbaric. Tea must be steeped in boiling water from a kettle, served in bone china.

If you continue this microwave nonsense, I shall have to write a sternly worded letter.

Regards,
Charles R.`,
    date: subHours(new Date(), 1.1).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'zelensky1',
    folder: FolderType.Inbox,
    from: { name: 'Volodymyr Z.', email: 'v@kyiv.ua', avatar: 'https://ui-avatars.com/api/?name=Volodymyr+Zelenskyy&background=228B22&color=fff' },
    to: [CURRENT_USER],
    subject: 'I need a ride to the meeting',
    snippet: 'Donald, can I hitch a ride on the big plane?...',
    body: `Donald,

I hear about the party on the 21st. 

Can you pick me up? I need a ride. Air Force One has good leg room, yes?

I will bring my own green t-shirt. I have many. 

Also, do not forget the ammo.

V.Z.`,
    date: subHours(new Date(), 1.2).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Green Category']
  },
  {
    id: 'oprah1',
    folder: FolderType.Junk,
    from: { name: 'Oprah', email: 'giveaway@o.com', avatar: 'https://ui-avatars.com/api/?name=Oprah+W&background=800080&color=fff' },
    to: [CURRENT_USER],
    subject: 'YOU GET A CAR!!!!!!',
    snippet: 'LOOK UNDER YOUR CHAIR DONALD...',
    body: `DONALD!

YOU GET A CAR!
MELANIA GETS A CAR!
BARRON GETS A CAR!

EVERYONE GETS A CAR!!!

(Note: The car is a 1998 Toyota Corolla. You are responsible for the taxes and shipping. Also, it has no engine.)

LIVE YOUR BEST LIFE!
- O`,
    date: subHours(new Date(), 1.25).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'xi_panda',
    folder: FolderType.Inbox,
    from: { name: 'Xi', email: 'pooh@beijing.cn', avatar: 'https://ui-avatars.com/api/?name=Xi+Jinping&background=red&color=yellow' },
    to: [CURRENT_USER],
    subject: 'Panda Rental Expired',
    snippet: 'Mr. Trump, the rental period is over...',
    body: `Mr. Trump,

The rental agreement for the pandas at the National Zoo has expired.

Please return them via FedEx Overnight immediately. 

Do not feed them cheeseburgers. They are on a strict bamboo diet. 

If you do not return them, I will turn off the 5G.

Xi`,
    date: subHours(new Date(), 1.3).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Red Category']
  },
  {
    id: 'bojo1',
    folder: FolderType.Inbox,
    from: { name: 'Boris', email: 'bojo@party.uk', avatar: 'https://ui-avatars.com/api/?name=Boris+Johnson&background=ffcc00&color=000' },
    to: [CURRENT_USER],
    subject: 'Hair Product Inquiry',
    snippet: 'Donald, old chap. A quick question...',
    body: `Donald, old boy!

Quick question between statesmen.

What is the structural hold rating of your hairspray? Mine collapses in a stiff breeze. Yours seems to possess architectural integrity.

Is it industrial grade? Do you need a permit for it?

Do share the brand.

Cheers,
Bojo`,
    date: subHours(new Date(), 1.4).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'trudeau1',
    folder: FolderType.Inbox,
    from: { name: 'Justin T.', email: 'jt@canada.ca', avatar: 'https://ui-avatars.com/api/?name=Justin+Trudeau&background=ff0000&color=fff' },
    to: [CURRENT_USER],
    subject: 'Sorry',
    snippet: 'I just wanted to apologize...',
    body: `Donald,

I just wanted to apologize. 

I'm not sure what for, but I feel like I should say sorry. It's a Canadian reflex.

Sorry for the cold air coming down from the North. 
Sorry for the geese.
Sorry for Drake.

Sorry,
Justin`,
    date: subHours(new Date(), 1.42).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'santos_cv',
    folder: FolderType.Junk,
    from: { name: 'George Santos', email: 'george@truth.com', avatar: 'https://ui-avatars.com/api/?name=George+Santos&background=pink&color=fff' },
    to: [CURRENT_USER],
    subject: 'Updated CV for Cabinet Position',
    snippet: 'Did I mention I invented electricity?...',
    body: `Mr. President,

I am submitting my updated CV for the position of "Secretary of Everything".

Updates:
- I was the first man on the moon (Neil Armstrong held the camera).
- I invented electricity.
- I am a 3-time Olympic gold medalist in Volleyball.
- I actually built the wall, personally, on a weekend.

When do I start?

George`,
    date: subHours(new Date(), 1.45).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'new1',
    folder: FolderType.Inbox,
    from: { name: 'Jared', email: 'jared@techsupport.gov', avatar: 'https://ui-avatars.com/api/?name=Jared+K&background=cccccc&color=000' },
    to: [CURRENT_USER],
    subject: 'The server in the bathroom is overheating',
    snippet: 'It is making a very loud humming noise...',
    body: `Dad (in law),

The private email server we installed in the Mar-a-Lago guest bathroom is running very hot. 

The humidity from the shower is not helping the hard drives. 

Should I open a window? I am worried about the drones seeing the blinking lights.

J`,
    date: subHours(new Date(), 1.5).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'biden1',
    folder: FolderType.Inbox,
    from: { name: 'Dark Brandon', email: 'joe@basement.gov', avatar: 'https://ui-avatars.com/api/?name=Joe+Biden&background=000&color=fff' },
    to: [CURRENT_USER],
    subject: 'Ice Cream Machine',
    snippet: 'Listen fat, the machine is down...',
    body: `Jack,

The soft serve machine in the mess hall is broken. 

This is a matter of national security. No malarkey.

Fix it or I unleash the laser eyes.

- JB`,
    date: subHours(new Date(), 1.6).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'ivanka1',
    folder: FolderType.Inbox,
    from: { name: 'Ivanka', email: 'ivanka@brand.com', avatar: 'https://ui-avatars.com/api/?name=Ivanka&background=FF69B4&color=fff' },
    to: [CURRENT_USER],
    subject: 'Seating Chart Issues',
    snippet: 'Daddy, I cannot sit next to Steve...',
    body: `Daddy,

Regarding the Mamdami summit:

1. I cannot sit next to Steve B. He wears too many shirts at once. It distracts from my dress.
2. I have patented the phrase "Secret Summit". Please ensure I get 10% of all t-shirt sales.
3. Can we make the carpet pink? The red is so 2016.

Love,
Ivanka`,
    date: subHours(new Date(), 1.8).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: ['Blue Category']
  },
  {
    id: '2',
    folder: FolderType.Sent,
    from: CURRENT_USER,
    to: [{ name: 'Mamdami', email: 'mamdami@secretchannel.com' }],
    subject: 'Re: URGENT: The date? 20. or 21. November?',
    snippet: 'Mamdami, listen to me. The 20th is a disaster...',
    body: `Mamdami,

Listen to me. The 20th is out. Totally out. I have a very big golf game. The biggest.

We do the 21st. The 21st is a beautiful number. It's huge. 

Make sure the hamberders are cold. I like them cold. It builds character.

And tell your astrologer he's a genius. Very smart guy.

DJT`,
    date: subHours(new Date(), 2).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: ['Blue Category']
  },
  {
    id: 'donjr1',
    folder: FolderType.Inbox,
    from: { name: 'Don Jr.', email: 'hunter@outdoors.com', avatar: 'https://ui-avatars.com/api/?name=Don+Jr&background=8B4513&color=fff' },
    to: [CURRENT_USER],
    subject: 'Dinner Menu Idea',
    snippet: 'Dad, hear me out. We hunt the dinner...',
    body: `Dad,

For the dinner with Mamdami. Hear me out.

We don't buy the steaks. We HUNT the steaks.

I know a spot behind the venue. I saw a very large cow there. Or maybe it was a moose. 

It would show dominance. Very alpha.

Thoughts?
Don`,
    date: subHours(new Date(), 2.2).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'tucker1',
    folder: FolderType.Inbox,
    from: { name: 'Tucker', email: 'tucker@x.com', avatar: 'https://ui-avatars.com/api/?name=Tucker+Carlson&background=000080&color=fff' },
    to: [CURRENT_USER],
    subject: 'The Bow Tie Question',
    snippet: 'Sir, the ratings. They miss the tie...',
    body: `Sir,

I have been looking at the data. 

When I wear the bow tie, the confused dog face I make hits 20% harder.

The people miss the tie. They crave the tie. 

Should I bring it back? Or is it too "swamp"?

Tucker`,
    date: subHours(new Date(), 2.4).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'new2',
    folder: FolderType.Sent,
    from: CURRENT_USER,
    to: [{ name: 'Mamdami', email: 'mamdami@secretchannel.com' }],
    subject: 'The Rat Situation',
    snippet: 'The rats in NYC are too big. Fix it...',
    body: `Mamdami,

I saw a video of a rat in the subway. It was carrying a slice of pizza. A whole slice!

This rat had no fear. It looked me in the eye through the TV screen. 

You need to appoint a Czar. A Rat Czar. I know a guy. He's very tough. He hates cheese.

Fix this before I visit.

DJT`,
    date: subHours(new Date(), 3).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'new3',
    folder: FolderType.Inbox,
    from: { name: 'Mamdami', email: 'mamdami@secretchannel.com', avatar: 'https://ui-avatars.com/api/?name=Mamdami&background=ff0000&color=fff' },
    to: [CURRENT_USER],
    subject: 'Re: The Rat Situation',
    snippet: 'King, the rats are my people...',
    body: `My Brother,

The rats are part of the ecosystem. They are my constituents. They hustle hard. 

That pizza rat? He is an entrepreneur. He is feeding his family. 

We respect the grind in this city. The swagger includes the rats.

But for you, I will have the red carpet rolled out. No rats on the carpet. I promise.

Mamdami`,
    date: subHours(new Date(), 2.5).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: ['Orange Category']
  },
  {
    id: 'barron1',
    folder: FolderType.Inbox,
    from: { name: 'Barron', email: 'cyber@expert.com', avatar: 'https://ui-avatars.com/api/?name=Barron&background=000000&color=fff' },
    to: [CURRENT_USER],
    subject: 'The Cyber at the venue',
    snippet: 'Father, the wifi is garbage...',
    body: `Father.

The wifi at the secret location is garbage. 2 bars.

I cannot run my Minecraft server with this latency. 

If you want me to attend, I need fiber optic direct line. 

Fix the Cyber.

B`,
    date: subHours(new Date(), 4).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: []
  },
  {
    id: '3',
    folder: FolderType.Inbox,
    from: { name: 'Mamdami', email: 'mamdami@secretchannel.com', avatar: 'https://ui-avatars.com/api/?name=Mamdami&background=ff0000&color=fff' },
    to: [CURRENT_USER],
    subject: 'The "Wind Problem" for the 21st',
    snippet: 'Sir, the forecast shows wind on the 21st...',
    body: `Sir,

I have a concern for the 21st. The weather channel predicts wind.

Your hair logistics team needs to be notified. Do we deploy the "Helmet" protocol? Or should I bring the extra-strength spray from the vault?

Waiting for your executive order.

Mamdami`,
    date: subHours(new Date(), 5).toISOString(),
    read: true,
    flagged: true,
    hasAttachments: true,
    categories: []
  },
  {
    id: 'new4',
    folder: FolderType.Inbox,
    from: { name: 'Vlad', email: 'vlad@kremlin.ru', avatar: 'https://ui-avatars.com/api/?name=Vladimir+Putin&background=000&color=fff' },
    to: [CURRENT_USER],
    subject: 'The Bear is awake',
    snippet: 'The big bear is hungry for honey...',
    body: `D,

The big bear is awake. He is hungry for honey. 

Do you have the honey? Or did you give it all to the Space Man?

Also, Zelenskyy tells me he is bringing green t-shirt. I bring shirt off. We wrestle?

I will call you on the secure line. Pick up.

- V`,
    date: subDays(new Date(), 1).toISOString(),
    read: false,
    flagged: true,
    hasAttachments: false,
    categories: ['Red Category']
  },
  {
    id: 'pope1',
    folder: FolderType.Inbox,
    from: { name: 'The Pope', email: 'pontifex@vatican.va', avatar: 'https://ui-avatars.com/api/?name=Pope+Francis&background=fff&color=000' },
    to: [CURRENT_USER],
    subject: 'Popemobile Tint',
    snippet: 'My son, can I get the blackout tint?...',
    body: `My son, Donald,

I see your motorcade. Very nice. Very shiny.

Can I get the blackout tint on the Popemobile? I want to wave, but sometimes I just want to eat a sandwich in peace.

The Swiss Guard says it is "not holy" to hide. I say it is holy to have lunch.

Pray for me.
Francis`,
    date: subDays(new Date(), 1).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: '4',
    folder: FolderType.Inbox,
    from: { name: 'Melania', email: 'flotus@closelook.com', avatar: 'https://ui-avatars.com/api/?name=Melania&background=ffd700&color=000' },
    to: [CURRENT_USER],
    subject: 'Christmas Decorations',
    snippet: 'I am painting the trees black...',
    body: `Donald,

I am starting the Christmas decorations.

I am painting the trees black. Like my soul after reading your tweets.

It will be very chic. Very gothic. 

Do not touch them. The paint is wet.

M`,
    date: subDays(new Date(), 1).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: ['Green Category']
  },
  {
    id: 'new5',
    folder: FolderType.Inbox,
    from: { name: 'Eric', email: 'eric@org.com', avatar: 'https://ui-avatars.com/api/?name=Eric&background=f0f0f0&color=333' },
    to: [CURRENT_USER],
    subject: 'Can I come?',
    snippet: 'Dad, can I come to the secret meeting?...',
    body: `Dad,

I heard about the secret meeting with Mamdami. Can I come?

I bought a new suit. It is blue. I look very serious in it.

I promise I won't talk. I will just hold the Diet Cokes.

Please?

Eric`,
    date: subDays(new Date(), 1).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: '5',
    folder: FolderType.Junk,
    from: { name: 'Fake News Weekly', email: 'reporter@fakenews.com' },
    to: [CURRENT_USER],
    subject: 'RUMOR: Meeting on the 21st?',
    snippet: 'We heard you are meeting Mamdami...',
    body: `Mr. President,

We are hearing rumors of a secret meeting on November 21st with a foreign operative known only as "Mamdami".

Is this regarding the national reserve of covfefe?

We demand an answer!`,
    date: subDays(new Date(), 2).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'new6',
    folder: FolderType.Junk,
    from: { name: 'Prince Al-Waleed', email: 'prince@wealth.ng' },
    to: [CURRENT_USER],
    subject: 'Business Opportunity of a Lifetime',
    snippet: 'Dear Sir, I have 50 Million Gold Bars...',
    body: `Dear Sir,

I am Prince Al-Waleed. I have 50 Million Gold Bars stuck in customs.

I need a small loan of $1 million to release them. I will split the gold 50/50.

You are a famous businessman. I know you understand a good deal.

Please reply with your bank account details.

Sincerely,
The Prince`,
    date: subDays(new Date(), 2).toISOString(),
    read: false,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: '6',
    folder: FolderType.Sent,
    from: CURRENT_USER,
    to: [{ name: 'Elon', email: 'x@x.com' }],
    subject: 'Rocket for Mamdami',
    snippet: 'Can you land it on the roof?',
    body: `Elon,

My friend. 

Mamdami wants to arrive in style on the 21st. Can we land a rocket on the roof? 

Make it pointy. The round ones look weak. Pointy is scary.

DJT`,
    date: subDays(new Date(), 3).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  },
  {
    id: 'new7',
    folder: FolderType.Drafts,
    from: CURRENT_USER,
    to: [{ name: 'HR', email: 'hr@closelook.com' }],
    subject: 'Complaint about office temp',
    snippet: 'It is freezing in here...',
    body: `To whom it may concern,

It is freezing in the Oval Office. Who touched the thermostat?

I want it at 75 degrees. Tropical. 

If I see anyone wearing a sweater, they are fired.

DJT`,
    date: subDays(new Date(), 4).toISOString(),
    read: true,
    flagged: false,
    hasAttachments: false,
    categories: []
  }
];

export const MOCK_MEETINGS: Meeting[] = [
    {
        id: 'm1',
        title: 'Secret Summit with Mamdami',
        start: setMinutes(setHours(addDays(new Date(), 1), 14), 0).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 1), 17), 0).toISOString(),
        location: 'The Subway VIP Lounge',
        description: 'Discussing the "Vibes" and infrastructure deals.',
        attendees: [
            { name: 'Mamdami', email: 'mamdami@secret.com' },
            { name: 'Jared', email: 'jared@gov.com' }
        ],
        color: 'bg-red-100 border-l-4 border-red-600 text-red-800'
    },
    {
        id: 'm2',
        title: 'Golf with Tiger',
        start: setMinutes(setHours(new Date(), 9), 0).toISOString(),
        end: setMinutes(setHours(new Date(), 13), 0).toISOString(),
        location: 'Bedminster',
        description: 'Must win. Do not let him win.',
        attendees: [
            { name: 'Tiger', email: 'tiger@golf.com' }
        ],
        color: 'bg-green-100 border-l-4 border-green-600 text-green-800'
    },
    {
        id: 'm3',
        title: 'Hair Appointment',
        start: setMinutes(setHours(subDays(new Date(), 1), 10), 0).toISOString(),
        end: setMinutes(setHours(subDays(new Date(), 1), 11), 30).toISOString(),
        location: 'The Gold Room',
        description: 'Structural reinforcement procedure.',
        attendees: [],
        color: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800'
    },
    {
        id: 'm4',
        title: 'Twitter Spaces with Elon',
        start: setMinutes(setHours(addDays(new Date(), 2), 20), 0).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 2), 22), 0).toISOString(),
        location: 'Online',
        description: 'Talking about free speech and memes.',
        attendees: [
             { name: 'Elon', email: 'e@x.com' }
        ],
        color: 'bg-blue-100 border-l-4 border-blue-600 text-blue-800'
    },
    {
        id: 'm5',
        title: 'Metaverse Leg Fitting',
        start: setMinutes(setHours(addDays(new Date(), 3), 11), 0).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 3), 12), 0).toISOString(),
        location: 'VR Headset',
        description: 'Trying on the new virtual knees with Zuck.',
        attendees: [
            { name: 'Mark Z.', email: 'zuck@meta.com' }
        ],
        color: 'bg-purple-100 border-l-4 border-purple-600 text-purple-800'
    },
    {
        id: 'm6',
        title: 'Yelling at Clouds',
        start: setMinutes(setHours(addDays(new Date(), 4), 15), 0).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 4), 16), 0).toISOString(),
        location: 'The Rose Garden',
        description: 'Scheduled yelling time. Very therapeutic.',
        attendees: [],
        color: 'bg-gray-100 border-l-4 border-gray-600 text-gray-800'
    },
    {
        id: 'm7',
        title: 'Negotiation with Satan',
        start: setMinutes(setHours(addDays(new Date(), 5), 23), 59).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 6), 1), 0).toISOString(),
        location: 'Crossroads (Georgia)',
        description: 'Renewing the contract for another 4 years.',
        attendees: [
            { name: 'The Devil', email: 'lucifer@hell.com' }
        ],
        color: 'bg-red-900 border-l-4 border-black text-white'
    },
    {
        id: 'm8',
        title: 'Brunch with Santa',
        start: setMinutes(setHours(addDays(new Date(), 6), 10), 0).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 6), 11), 30).toISOString(),
        location: 'North Pole Annex',
        description: 'Appealing the Naughty List decision.',
        attendees: [
            { name: 'Santa Claus', email: 'nick@northpole.org' }
        ],
        color: 'bg-red-100 border-l-4 border-green-600 text-red-800'
    },
     {
        id: 'm9',
        title: 'Concert with Kanye',
        start: setMinutes(setHours(addDays(new Date(), 7), 19), 0).toISOString(),
        end: setMinutes(setHours(addDays(new Date(), 7), 22), 0).toISOString(),
        location: 'Wyoming',
        description: 'Listening to the Fish Sticks remix.',
        attendees: [
            { name: 'Ye', email: 'ye@yeezy.com' }
        ],
        color: 'bg-gray-100 border-l-4 border-gray-900 text-black'
    }
];

export { CURRENT_USER };
