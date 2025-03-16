export default function AppleMusicEmbed({ songUrl }: {songUrl: string}) {

    const embedUrl = songUrl.replace("music.apple.com", "embed.music.apple.com");
    return (
        <iframe
            allow="autoplay *; encrypted-media *;"
            frameBorder="0"
            style={{
                padding: "4px",
                width: "100%",
                maxWidth: "660px",
                overflow: "hidden",
                borderRadius: "10px"
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            src={embedUrl}
        />
    );
}
