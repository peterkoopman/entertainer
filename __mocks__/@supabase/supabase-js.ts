// __mocks__/@supabase/supabase-js.ts

// Optional: If you want to mock specific types, you can import them.
// import type { SupabaseClient } from '@supabase/supabase-js';

// This is the mock implementation for createClient
export const createClient = jest.fn(
  (supabaseUrl: string, supabaseAnonKey: string, options?: any) => {
    console.log('Mocked Supabase Client created!'); // Helps confirm the mock is being used

    return {
      // Mock the auth object and its methods
      auth: {
        getSession: jest.fn(() =>
          Promise.resolve({
            data: {
              session: null, // Return null session by default, or customize
            },
            error: null,
          })
        ),
        signInWithPassword: jest.fn(() =>
          Promise.resolve({
            data: {
              user: { id: 'mock-user-id', email: 'test@example.com' },
              session: { access_token: 'mock-token' },
            },
            error: null,
          })
        ),
        signOut: jest.fn(() => Promise.resolve({ error: null })),
        signUp: jest.fn(() =>
          Promise.resolve({ data: { user: null, session: null }, error: null })
        ),
        onAuthStateChange: jest.fn((callback) => {
          // You can call the callback immediately or after a delay for specific tests
          // For example, to simulate an initial session:
          // callback('INITIAL_SESSION', { session: { user: { id: 'mock-user-id' } } });
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        }),
        // Add other auth methods you use:
        // updateUser: jest.fn(),
        // resetPasswordForEmail: jest.fn(),
      },

      // Mock the from method (for table operations)
      from: jest.fn((tableName: string) => ({
        select: jest.fn((columns?: string) =>
          Promise.resolve({
            data: [], // Default empty array, customize in specific tests
            error: null,
          })
        ),
        insert: jest.fn((data: any) =>
          Promise.resolve({
            data: data, // Return the inserted data
            error: null,
          })
        ),
        update: jest.fn((data: any) =>
          Promise.resolve({
            data: data,
            error: null,
          })
        ),
        delete: jest.fn(() =>
          Promise.resolve({
            data: [],
            error: null,
          })
        ),
        // Add other table methods like eq, filter, order, limit, etc.
        // You'll need to chain them if your code does:
        // eq: jest.fn(() => this), // To allow chaining .eq().select()
        // order: jest.fn(() => this),
        // limit: jest.fn(() => this),
        // ...
      })),

      // Mock the storage object
      storage: {
        from: jest.fn((bucketName: string) => ({
          upload: jest.fn(() =>
            Promise.resolve({ data: { path: 'mock/path' }, error: null })
          ),
          download: jest.fn(() =>
            Promise.resolve({ data: new Blob(), error: null })
          ),
          getPublicUrl: jest.fn(() => ({
            data: { publicUrl: 'mock-public-url' },
          })),
        })),
      },

      // Mock other top-level methods if you use them directly on the client
      rpc: jest.fn(() => Promise.resolve({ data: {}, error: null })),
      // Add other mocks for functions, realtime, etc. as needed
    };
  }
);

// If you also use `@supabase/ssr`, you might need to mock that similarly
// For instance, if you use `createServerClient` or `createBrowserClient`
export const createServerClient = jest.fn(() => ({
  // ... mock the same methods as createClient above
  auth: {
    getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
    // ...
  },
  from: jest.fn(() => ({
    select: jest.fn(() => Promise.resolve({ data: [], error: null })),
    // ...
  })),
}));

export const createBrowserClient = jest.fn(() => ({
  // ... mock the same methods as createClient above
  auth: {
    getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
    // ...
  },
  from: jest.fn(() => ({
    select: jest.fn(() => Promise.resolve({ data: [], error: null })),
    // ...
  })),
}));

// If you have constants like GoTrueClient etc. used directly
// export const GoTrueClient = jest.fn();
// export const SupabaseClient = jest.fn();
