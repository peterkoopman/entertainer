export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      booking: {
        Row: {
          address: string | null;
          client_id: number | null;
          created_at: string;
          date: string | null;
          deposit: number | null;
          end_time: string | null;
          fee: number | null;
          id: number;
          job_notes: string | null;
          load_in: string | null;
          personnel_notes: string | null;
          soundcheck: string | null;
          start_time: string | null;
          venue_name: string | null;
        };
        Insert: {
          address?: string | null;
          client_id?: number | null;
          created_at?: string;
          date?: string | null;
          deposit?: number | null;
          end_time?: string | null;
          fee?: number | null;
          id?: number;
          job_notes?: string | null;
          load_in?: string | null;
          personnel_notes?: string | null;
          soundcheck?: string | null;
          start_time?: string | null;
          venue_name?: string | null;
        };
        Update: {
          address?: string | null;
          client_id?: number | null;
          created_at?: string;
          date?: string | null;
          deposit?: number | null;
          end_time?: string | null;
          fee?: number | null;
          id?: number;
          job_notes?: string | null;
          load_in?: string | null;
          personnel_notes?: string | null;
          soundcheck?: string | null;
          start_time?: string | null;
          venue_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'booking_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'client';
            referencedColumns: ['id'];
          }
        ];
      };
      client: {
        Row: {
          address: string | null;
          city: string | null;
          company: string | null;
          country: string | null;
          created_at: string;
          email: string | null;
          id: number;
          name: string | null;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          company?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          company?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      role: {
        Row: {
          created_at: string;
          id: number;
          role: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          role?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          role?: string | null;
        };
        Relationships: [];
      };
      skill: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      user_role: {
        Row: {
          created_at: string;
          id: number;
          role_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          role_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          role_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_role_role_id_fkey';
            columns: ['role_id'];
            isOneToOne: false;
            referencedRelation: 'role';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_role_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'userprofile';
            referencedColumns: ['id'];
          }
        ];
      };
      user_skillset: {
        Row: {
          created_at: string;
          skill_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          skill_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          skill_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_skillset_skill_id_fkey';
            columns: ['skill_id'];
            isOneToOne: false;
            referencedRelation: 'skill';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_skillset_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'userprofile';
            referencedColumns: ['id'];
          }
        ];
      };
      userprofile: {
        Row: {
          address: string | null;
          avatar_url: string | null;
          city: string | null;
          country: string | null;
          created_at: string | null;
          full_name: string | null;
          gst_registered: boolean | null;
          id: string;
          phone: string | null;
          tax_no: string | null;
          updated_at: string | null;
          username: string | null;
          withholding_tax: boolean | null;
        };
        Insert: {
          address?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          gst_registered?: boolean | null;
          id: string;
          phone?: string | null;
          tax_no?: string | null;
          updated_at?: string | null;
          username?: string | null;
          withholding_tax?: boolean | null;
        };
        Update: {
          address?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          gst_registered?: boolean | null;
          id?: string;
          phone?: string | null;
          tax_no?: string | null;
          updated_at?: string | null;
          username?: string | null;
          withholding_tax?: boolean | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
