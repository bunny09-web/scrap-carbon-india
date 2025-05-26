export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      carbon_credits: {
        Row: {
          buyer_id: string | null
          created_at: string
          credits_generated: number
          emission_factor: number
          id: string
          market_price: number | null
          methodology: string
          status: Database["public"]["Enums"]["credit_status"] | null
          transaction_id: string
          updated_at: string
          verification_date: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string
          credits_generated: number
          emission_factor: number
          id?: string
          market_price?: number | null
          methodology?: string
          status?: Database["public"]["Enums"]["credit_status"] | null
          transaction_id: string
          updated_at?: string
          verification_date?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string
          credits_generated?: number
          emission_factor?: number
          id?: string
          market_price?: number | null
          methodology?: string
          status?: Database["public"]["Enums"]["credit_status"] | null
          transaction_id?: string
          updated_at?: string
          verification_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carbon_credits_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carbon_credits_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "scrap_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      epr_reports: {
        Row: {
          company_id: string
          compliance_status: string | null
          created_at: string
          filed_date: string | null
          id: string
          reporting_period: string
          total_credits_generated: number
          total_scrap_processed: number
        }
        Insert: {
          company_id: string
          compliance_status?: string | null
          created_at?: string
          filed_date?: string | null
          id?: string
          reporting_period: string
          total_credits_generated: number
          total_scrap_processed: number
        }
        Update: {
          company_id?: string
          compliance_status?: string | null
          created_at?: string
          filed_date?: string | null
          id?: string
          reporting_period?: string
          total_credits_generated?: number
          total_scrap_processed?: number
        }
        Relationships: [
          {
            foreignKeyName: "epr_reports_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aadhaar_number: string | null
          address: string | null
          business_name: string | null
          created_at: string
          full_name: string
          gst_number: string | null
          id: string
          kyc_verified: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          upi_id: string | null
          user_id: string
        }
        Insert: {
          aadhaar_number?: string | null
          address?: string | null
          business_name?: string | null
          created_at?: string
          full_name: string
          gst_number?: string | null
          id?: string
          kyc_verified?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          upi_id?: string | null
          user_id: string
        }
        Update: {
          aadhaar_number?: string | null
          address?: string | null
          business_name?: string | null
          created_at?: string
          full_name?: string
          gst_number?: string | null
          id?: string
          kyc_verified?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          upi_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scrap_transactions: {
        Row: {
          buyer_id: string | null
          created_at: string
          id: string
          images: string[] | null
          location: string | null
          notes: string | null
          price_per_kg: number
          scrap_type: Database["public"]["Enums"]["scrap_type"]
          seller_id: string
          status: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          updated_at: string
          weight_kg: number
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string
          id?: string
          images?: string[] | null
          location?: string | null
          notes?: string | null
          price_per_kg: number
          scrap_type: Database["public"]["Enums"]["scrap_type"]
          seller_id: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount: number
          updated_at?: string
          weight_kg: number
        }
        Update: {
          buyer_id?: string | null
          created_at?: string
          id?: string
          images?: string[] | null
          location?: string | null
          notes?: string | null
          price_per_kg?: number
          scrap_type?: Database["public"]["Enums"]["scrap_type"]
          seller_id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          total_amount?: number
          updated_at?: string
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "scrap_transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scrap_transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      credit_status: "calculated" | "verified" | "minted" | "traded"
      scrap_type:
        | "aluminum"
        | "steel"
        | "pet_plastic"
        | "copper"
        | "paper"
        | "glass"
        | "e_waste"
        | "cardboard"
        | "brass"
        | "iron"
        | "mixed_plastic"
        | "textile"
      transaction_status: "pending" | "verified" | "completed" | "cancelled"
      user_role: "kabadiwala" | "recycler" | "corporate" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      credit_status: ["calculated", "verified", "minted", "traded"],
      scrap_type: [
        "aluminum",
        "steel",
        "pet_plastic",
        "copper",
        "paper",
        "glass",
        "e_waste",
        "cardboard",
        "brass",
        "iron",
        "mixed_plastic",
        "textile",
      ],
      transaction_status: ["pending", "verified", "completed", "cancelled"],
      user_role: ["kabadiwala", "recycler", "corporate", "admin"],
    },
  },
} as const
