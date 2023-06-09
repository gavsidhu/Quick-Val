export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          country: string | null
          created_at: string | null
          device: string | null
          end_time: string | null
          http_referer: string | null
          id: number
          ip_address: string | null
          landing_page_id: number | null
          page: string | null
          time_spent: string | null
          user_id: string | null
          visit_time: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          device?: string | null
          end_time?: string | null
          http_referer?: string | null
          id?: number
          ip_address?: string | null
          landing_page_id?: number | null
          page?: string | null
          time_spent?: string | null
          user_id?: string | null
          visit_time?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          device?: string | null
          end_time?: string | null
          http_referer?: string | null
          id?: number
          ip_address?: string | null
          landing_page_id?: number | null
          page?: string | null
          time_spent?: string | null
          user_id?: string | null
          visit_time?: string | null
        }
      }
      landing_pages: {
        Row: {
          content: Json | null
          created_at: string | null
          custom_domain: string | null
          description: string | null
          goal: string | null
          id: number
          subdomain: string
          template_id: string | null
          template_type: string | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          custom_domain?: string | null
          description?: string | null
          goal?: string | null
          id?: number
          subdomain: string
          template_id?: string | null
          template_type?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          custom_domain?: string | null
          description?: string | null
          goal?: string | null
          id?: number
          subdomain?: string
          template_id?: string | null
          template_type?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
      }
      payments: {
        Row: {
          amount: number
          client_secret: string | null
          created_at: string | null
          customer_id: string | null
          id: number
          landing_page_id: number
          payment_intent_created: number | null
          payment_intent_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          client_secret?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: number
          landing_page_id: number
          payment_intent_created?: number | null
          payment_intent_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          client_secret?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: number
          landing_page_id?: number
          payment_intent_created?: number | null
          payment_intent_id?: string | null
          status?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
