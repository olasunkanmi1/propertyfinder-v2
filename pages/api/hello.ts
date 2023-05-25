export const config = {
  runtime: 'edge',
};

export default function handler(req: Request) {
  return new Response('No Using Edge Function!');
}
