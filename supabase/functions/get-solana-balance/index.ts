import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-mainnet.g.alchemy.com/v2/demo',
  'https://rpc.ankr.com/solana',
  'https://solana-api.projectserum.com',
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();
    
    if (!address) {
      console.error('No address provided');
      return new Response(
        JSON.stringify({ error: 'Address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching balance for address: ${address}`);

    // Try each endpoint until one works
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [address],
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.log(`Endpoint ${endpoint} returned status ${response.status}`);
          continue;
        }

        const data = await response.json();
        console.log(`Response from ${endpoint}:`, JSON.stringify(data));

        if (data.error) {
          console.log(`Endpoint ${endpoint} returned error:`, data.error);
          continue;
        }

        if (typeof data.result?.value === 'number') {
          const balanceInSol = data.result.value / 1e9;
          console.log(`Successfully fetched balance: ${balanceInSol} SOL from ${endpoint}`);
          
          return new Response(
            JSON.stringify({ 
              balance: balanceInSol,
              endpoint: endpoint 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (err) {
        console.error(`Error with endpoint ${endpoint}:`, err);
        continue;
      }
    }

    // If all endpoints failed
    console.error('All RPC endpoints failed');
    return new Response(
      JSON.stringify({ error: 'Unable to fetch balance from any RPC endpoint', balance: null }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-solana-balance function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
