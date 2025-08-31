'use client'
import React, { useState, useRef } from 'react';
import GallerySection from '../components/GallerySection';
import StickyNavigation from '../components/StickyNavigation';
import DoodleBackground from '../components/DoodleBackground';
import ImagePreloader from '../components/ImagePreloader';
import MusicPlayer, { MusicPlayerRef } from '../components/MusicPlayer';
import MusicPrompt from '../components/MusicPrompt';
import { getDayImages } from '../utils/gridLayouts';

const themedDays = [
  {
    id: 'corporate',
    title: 'Corporate Day',
    description: "You stepped out in a stunning red gown, the kind that would make even a traditional English beauty jealous. That smile, so radiant, so genuine, lit up the entire day. Your confidence and charisma in that dress were extraordinary, like you were born for that moment. The morning hadn't started easy. The outfit you had paid for never came, and I saw the frustration in your eyes. Yet, you turned the setback into a triumph. Youfound a new dress that very morning, and when you wore it, you didn't just show up, you owned the day. 💼✨",
    accentColor: 'bg-blue-500',
    images: getDayImages('corporate')
  },
  {
    id: 'denim',
    title: 'Denim Day',
    description: "You wore denim 👖 like it was made just for you. A gown that flowed with elegance, with the charm of an overall and the boldness of a jacket. Paired with your black bag and shoes, the outfit came together in a way that was simply breathtaking. But it wasn't just the outfit that stole my heart, it was you. The way you carried yourself, the confidence in your steps, the light in your smile. In that moment, you weren't just the most beautiful person there… you were the most beautiful person I had ever seen. And honestly? I think denim retired that day because no one else can wear it better than you. 😊💙",
    accentColor: 'bg-indigo-500',
    images: getDayImages('denim')
  },
  {
    id: 'jersey',
    title: 'Jersey Day',
    description: "You showed up in a Juventus jersey ⚽, black cargo pants, and white sneakers and just like that, my sporty baby stole the show. The energy, the vibe, the way you wore it with such confidence… you were absolutely glowing. Now, don't get me wrong I'm a Manchester United fan through and through. Normally, seeing that black and white would sting a little. But honestly? How could I ever be mad when you looked that good? If Juventus had you as their brand ambassador, even I might be tempted to switch sides. Almost. hehehe... 🏃‍♀️🏆",
    accentColor: 'bg-green-500',
    images: getDayImages('jersey')
  },
  {
    id: 'costume',
    title: 'Costume Day',
    description: "Now here's the twist in the story, my baby didn't get to wear any costume 🎭 for Costume Day. Instead, You spent the day locked in an epic battle with your tailor. While others were rocking superheroes and fairies, you became your own kind of hero “The Fearless Customer,” taking on a tailor armed with scissors and excuses. I even made a mock picture of you in the fight (and honestly, Marvel needs to sign you ASAP). Sure, you didn't wear a costume, but watching you stand your ground and fight for what you wanted? That was a show of strength and trust me, nothing looks better on you than that. 🎪✨",
    accentColor: 'bg-purple-500',
    images: getDayImages('costume')
  },
  {
    id: 'owambe',
    title: 'Owambe Day',
    description: "Ahhh, this one sweet me die. Even though your tailor decided to do awon werey things again, my baby still came through looking like fire 👗. The outfit you ended up with? Choke! 🔥 See ehn, ata rodo no hot reach you. Pepper dem gang sef go learn work where you dey. The way you carried yourself grace mixed with small shakara omo, heads were turning left, right, and center. Na only me fit stand that heat, because others for don faint already. 😂 Cultural Day turned to “My Baby the Festival,”🎊💃 because anywhere you enter, vibes just full ground. 🥂✨",
    accentColor: 'bg-yellow-500',
    images: getDayImages('owambe')
  },
  {
    id: 'others',
    title: 'Special Moments',
    description: "📸 Mehnnn, Unilag wan wound you my love, but you conquered. You were very effective in everything you did. I am sure your impact will live on in that school. I am proud of you and look forward to greater things awaiting you in the future. I am really thankful to have you in my life. I love you with everything in me. 💫💝",
    accentColor: 'bg-pink-500',
    images: getDayImages('others')
  }
];

export default function Home() {
  // Navigation sections for sticky nav
  const navigationSections = themedDays.map(day => ({
    id: day.id,
    title: day.title,
    label: day.title.split(' ')[0] // Use first word as label
  }));

  // Get all critical images (first 6 from each section)
  const criticalImages = themedDays.flatMap(day => {
    return day.images.slice(0, 6); // First 6 images from each section
  });

  // Music prompt state
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  const handleStartMusic = () => {
    musicPlayerRef.current?.startMusic();
    setShowMusicPrompt(false);
  };

  const handleSkipMusic = () => {
    setShowMusicPrompt(false);
  };

  const handleLoaderFinished = () => {
    setLoaderComplete(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Romantic Background */}
      <DoodleBackground />
      
      {/* Preloader */}
      <ImagePreloader 
        images={criticalImages}
        priority={true}
        onComplete={() => {}}
        onProgress={() => {}}
        onLoaderFinished={handleLoaderFinished}
      />
      
      {/* Sticky Navigation */}
      <StickyNavigation sections={navigationSections} />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-16 sm:mb-20 relative z-10 px-4 sm:px-0">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-[45px] sm:text-[30px] md:text-[40px] lg:text-[40px] font-bold mb-8 sm:mb-10 gallery-title animate-romantic-fade-in">
                Final Year Gallery
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-10 sm:mb-14 gallery-subtitle animate-romantic-fade-in" style={{ animationDelay: '0.3s' }}>
                A week of memories, laughter, and unforgettable moments ✨💕
              </p>
              
              {/* Romantic decorative elements */}
              <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-8 sm:mb-10 animate-romantic-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-pink-400 rounded-full animate-heartbeat"></div>
                <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-romantic-fade-in gallery-subtitle" style={{ animationDelay: '0.9s' }}>
                From corporate professionalism to cultural celebrations, each day brought its own unique charm and memories. 
                Scroll through your themed days and relive the moments that made your final year truly special. 🎉🌟
              </p>
            </div>
      </section>

          {/* Gallery Sections */}
          <section className="mb-16 sm:mb-20 relative z-10 px-4 sm:px-0">
            <h2 className="text-[40px] sm:text-[25px] md:text-[27px] font-normal mb-10 sm:mb-14 gallery-title text-center animate-romantic-fade-in">
              The Themed Days
          </h2>
            <p className="max-w-5xl mx-auto text-center text-gray-700 text-lg sm:text-xl gallery-subtitle mb-14 sm:mb-18 animate-romantic-fade-in">
              Each day was carefully themed to create diverse and memorable experiences. 
              From professional settings to cultural celebrations, you captured it all. 📸🎨
            </p>
            
            <div className="space-y-24 sm:space-y-32">
              {themedDays.map((day, index) => (
                <GallerySection
                  key={day.id}
                  id={day.id}
                  title={day.title}
                  description={day.description}
                  images={day.images}
                  accentColor={day.accentColor}
                  dayIndex={index}
                />
              ))}
            </div>
          </section>
          
          {/* Footer Section */}
          <section className="text-center py-16 sm:py-20 relative z-10 animate-romantic-fade-in">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 gallery-title">
                Thank You for the Memories 💝
              </h3>
              <p className="text-gray-700 text-lg sm:text-xl gallery-subtitle mb-8 sm:mb-10">
                This gallery represents more than just photos - it&apos;s a collection of friendships, 
                laughter, and the bonds you&apos;ve built throughout your university journey. 🤗💫
              </p>
              
              {/* Romantic closing elements */}
              <div className="flex justify-center items-center space-x-4 sm:space-x-6 mb-8 sm:mb-10">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full animate-sparkle"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-300 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 italic font-handwriting">
                &ldquo;The best memories are made with the best people&rdquo; ❤️
              </p>
          </div>
        </section>
        </div>
      </main>
      
      {/* Scroll to Top Button */}
      {/* <ScrollToTop /> */}
      
      {/* Music Player */}
      <MusicPlayer 
        audioSrcs={[
          "/audio/forever-sweet.mp3",
          "/audio/orente.mp3"
        ]}
        className="block"
        onMusicStarted={() => {}}
        ref={musicPlayerRef}
      />

      {/* Music Prompt */}
      {showMusicPrompt && (
        <MusicPrompt
          onStartMusic={handleStartMusic}
          onSkip={handleSkipMusic}
          loaderComplete={loaderComplete}
        />
      )}
    </div>
  );
}
