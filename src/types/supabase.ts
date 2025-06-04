export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          price: number
          file_url: string | null
          thumbnail_url: string | null
          is_active: boolean
          requires_license: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          price?: number
          file_url?: string | null
          thumbnail_url?: string | null
          is_active?: boolean
          requires_license?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          price?: number
          file_url?: string | null
          thumbnail_url?: string | null
          is_active?: boolean
          requires_license?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      licenses: {
        Row: {
          id: string
          product_id: string
          license_key: string
          is_active: boolean
          max_activations: number
          current_activations: number
          customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          license_key: string
          is_active?: boolean
          max_activations?: number
          current_activations?: number
          customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          license_key?: string
          is_active?: boolean
          max_activations?: number
          current_activations?: number
          customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          owner_id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          product_id: string
          customer_id: string
          license_id: string | null
          purchase_date: string
          amount: number
          payment_method: string | null
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          customer_id: string
          license_id?: string | null
          purchase_date?: string
          amount?: number
          payment_method?: string | null
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          customer_id?: string
          license_id?: string | null
          purchase_date?: string
          amount?: number
          payment_method?: string | null
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      downloads: {
        Row: {
          id: string
          product_id: string
          customer_id: string
          download_date: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          customer_id: string
          download_date?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          customer_id?: string
          download_date?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}
