export default function(ctx) {
    const links = new Map([
      ['/discord', 'https://discord.gg/QjfTqzJsHJ'],
      ['/discord/voice', 'https://discord.gg/kzyKZFAeXG'],
      ['/discord/temporary', 'https://discord.gg/V4WcRwQEKR'],
      ['/discord/voice/temporary', 'https://discord.gg/b2A6KJnW8Y'],
    ]);

    let fullPath = ctx.route.fullPath;
    if(fullPath.endsWith('/')) fullPath = fullPath.slice(0,-1);

    if(links.has(fullPath)) {
        ctx.redirect(301, links.get(fullPath));
    }
}
