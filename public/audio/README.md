# Music Setup Instructions

## Adding Your Love Songs

1. **Prepare Your Audio Files:**
   - Use MP3 format for best compatibility
   - Keep file sizes reasonable (under 5MB each recommended)
   - Choose romantic love songs that fit the gallery theme
   - **Multiple Songs**: You can add multiple songs for variety

2. **File Placement:**
   - Place your audio files in this directory (`/public/audio/`)
   - Current songs: `forever-sweet.mp3` and `romantic-love-song.mp3`
   - Add more songs as needed

3. **Recommended Songs:**
   - Soft, romantic instrumental music
   - Acoustic love songs
   - Piano or guitar-based romantic melodies
   - Avoid songs with heavy bass or loud vocals
   - **Variety**: Different moods and tempos work well together

4. **Multiple Song Playback:**
   - **Alternating Playback**: Songs play in sequence (Song 1 → Song 2 → Song 1 → Song 2...)
   - **Seamless Transitions**: No gaps between songs
   - **Song Indicator**: Shows "Love Song X of Y" in the player
   - **Continuous Loop**: Music plays indefinitely through all songs

5. **Adding More Songs:**
   To add more songs, update the `audioSrcs` array in `src/app/page.tsx`:
   ```tsx
   <MusicPlayer 
     audioSrcs={[
       "/audio/forever-sweet.mp3",
       "/audio/romantic-love-song.mp3",
       "/audio/your-third-song.mp3",
       "/audio/your-fourth-song.mp3"
     ]}
     className="block"
     onMusicStarted={() => setMusicStarted(true)}
     ref={musicPlayerRef}
   />
   ```

## Features

- **Multiple Song Support** - Play multiple romantic songs in sequence
- **Alternating Playback** - Songs cycle through continuously
- **Auto-play on user interaction** (browser requirement)
- **Volume control** with romantic slider styling
- **Play/Pause controls** with beautiful animations
- **Song indicator** showing current song number
- **Mobile-friendly** (hidden on small screens to save bandwidth)

## Playback Behavior

- **Song 1 finishes** → Song 2 starts automatically
- **Song 2 finishes** → Song 1 starts automatically
- **Continuous loop** through all songs
- **No interruptions** - seamless romantic atmosphere
- **User control** - can pause/resume at any time

## Browser Compatibility

- Modern browsers support auto-play with user interaction
- Mobile browsers may have additional restrictions
- The player gracefully handles unsupported scenarios

Enjoy your romantic gallery experience with beautiful alternating music! 💕🎵
