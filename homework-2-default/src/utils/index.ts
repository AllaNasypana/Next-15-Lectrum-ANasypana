import { redirects } from '@/routes';


const mapLinks =new Map<string, string>();
redirects.forEach(s => {
    mapLinks.set(s.source, s.destination)
});
export const reclaimForRedirectLinks = (href: string) => {
    if(mapLinks?.has(href)) {
        return mapLinks.get(href);
    }
}

export const addingNewLinks = (links: string[]) => {
    const newLinks = [...links];
    links.forEach(link => {
        if(mapLinks?.has(link) && !!mapLinks?.get(link)) {
            newLinks.push(mapLinks?.get(link) as unknown as string);
        }
    })

    return newLinks;

}
