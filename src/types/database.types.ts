export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
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
          setup_id: number | null;
          soundcheck: string | null;
          start_time: string | null;
          status_id: number | null;
          tax_type_id: number | null;
          type_id: number | null;
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
          setup_id?: number | null;
          soundcheck?: string | null;
          start_time?: string | null;
          status_id?: number | null;
          tax_type_id?: number | null;
          type_id?: number | null;
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
          setup_id?: number | null;
          soundcheck?: string | null;
          start_time?: string | null;
          status_id?: number | null;
          tax_type_id?: number | null;
          type_id?: number | null;
          venue_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'booking_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'client';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'booking_setup_id_fkey';
            columns: ['setup_id'];
            isOneToOne: false;
            referencedRelation: 'booking_setup';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'booking_status_id_fkey';
            columns: ['status_id'];
            isOneToOne: false;
            referencedRelation: 'booking_status';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'booking_tax_type_id_fkey';
            columns: ['tax_type_id'];
            isOneToOne: false;
            referencedRelation: 'tax_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'booking_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'booking_type';
            referencedColumns: ['id'];
          }
        ];
      };
      booking_setup: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      booking_status: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      booking_type: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
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
          notes: string | null;
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
          notes?: string | null;
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
          notes?: string | null;
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
      tax_type: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
