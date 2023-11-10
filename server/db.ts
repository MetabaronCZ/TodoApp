import { Todo } from 'models/Todo';
import { Folder } from 'models/Folder';
import { SettingsData } from 'models/Settings';

const folderCount = 12;
const todoCount = 120;

const startDate = new Date(2000, 1, 1).getMilliseconds();
const endDate = Date.now();

const randomSentences = [
  'Everyone pretends to like wheat until you mention barley.',
  "They say that dogs are man's best friend, but this cat was setting out to sabotage that theory.",
  "He was the only member of the club who didn't like plum pudding.",
  'The anaconda was the greatest criminal mastermind in this part of the neighborhood.',
  "It's always a good idea to seek shelter from the evil gaze of the sun.",
  'The beauty of the sunset was obscured by the industrial cranes.',
  "They're playing the piano while flying in the plane.",
  'Nobody has encountered an explosive daisy and lived to tell the tale.',
  'Her scream silenced the rowdy teenagers.',
  "Mr. Montoya knows the way to the bakery even though he's never been there.",
  'He had a vague sense that trees gave birth to dinosaurs.',
  'This book is sure to liquefy your brain.',
  'Purple is the best city in the forest.',
  'Eating eggs on Thursday for choir practice was recommended.',
  'Little Red Riding Hood decided to wear orange today.',
  "I used to practice weaving with spaghetti three hours a day but stopped because I didn't want to die alone.",
  'The gloves protect my feet from excess work.',
  'Andy loved to sleep on a bed of nails.',
  "David subscribes to the 'stuff your tent into the bag' strategy over nicely folding it.",
  'Last Friday I saw a spotted striped blue worm shake hands with a legless lizard.',
  'The shooter says goodbye to his love.',
  'Peanut butter and jelly caused the elderly lady to think about her past.',
  'He embraced his new life as an eggplant.',
  'My Mum tries to be cool by saying that she likes all the same things that I do.',
  "The fog was so dense even a laser decided it wasn't worth the effort.",
  "Improve your goldfish's physical fitness by getting him a bicycle.",
  'The miniature pet elephant became the envy of the neighborhood.',
  'He is no James Bond; his name is Roger Moore.',
  "Separation anxiety is what happens when you can't find your phone.",
  'The tattered work gloves speak of the many hours of hard labor he endured throughout his life.',
  'Sometimes I stare at a door or a wall and I wonder what is this reality, why am I alive and what is this all about?',
  'There was coal in his stocking and he was thrilled.',
  "There's no reason a hula hoop can't also be a circus ring.",
  'Car safety systems have come a long way, but he was out to prove they could be outsmarted.',
  'The complicated school homework left the parents trying to help their kids quite confused.',
  'Flesh-colored yoga pants were far worse than even he feared.',
  'The book is in front of the table.',
  "It's important to remember to be aware of rampaging grizzly bears.",
  'She can live her life however she wants as long as she listens to what I have to say.',
  'Nancy decided to make the porta-potty her home.',
];

const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomItem = <T>(array: T[]): T => {
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};

const folders: Folder[] = Array(folderCount)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    title: `Složka ${i + 1}`,
  }));

const todos: Todo[] = Array(todoCount)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    title: getRandomItem(randomSentences),
    description: getRandomItem(randomSentences),
    folder: Math.random() > 0.2 ? getRandomItem(folders).id : null,
    isDone: Math.random() > 0.6,
    created: getRandomInteger(startDate, endDate),
  }));

interface DbMock {
  todos: Todo[];
  folders: Folder[];
  settings: SettingsData;
}

export const mockedDb: DbMock = {
  todos,
  folders,
  settings: {
    perPage: 20,
  },
};
