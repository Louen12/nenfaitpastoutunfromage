export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      actualites: {
        Row: {
          contenu: string | null
          created_at: string
          id: string
          image_url: string | null
          position: number
          publie: boolean
          titre: string
        }
        Insert: {
          contenu?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          position?: number
          publie?: boolean
          titre: string
        }
        Update: {
          contenu?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          position?: number
          publie?: boolean
          titre?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          nom: string
          position: number
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          nom: string
          position?: number
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string
          position?: number
          slug?: string
        }
        Relationships: []
      }
      commande_items: {
        Row: {
          commande_id: string
          id: string
          nom_produit: string
          prix_unitaire_cents: number
          produit_id: string | null
          quantite: number
          unite_label: string | null
        }
        Insert: {
          commande_id: string
          id?: string
          nom_produit: string
          prix_unitaire_cents: number
          produit_id?: string | null
          quantite: number
          unite_label?: string | null
        }
        Update: {
          commande_id?: string
          id?: string
          nom_produit?: string
          prix_unitaire_cents?: number
          produit_id?: string | null
          quantite?: number
          unite_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commande_items_commande_id_fkey"
            columns: ["commande_id"]
            isOneToOne: false
            referencedRelation: "commandes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commande_items_produit_id_fkey"
            columns: ["produit_id"]
            isOneToOne: false
            referencedRelation: "produits"
            referencedColumns: ["id"]
          },
        ]
      }
      commandes: {
        Row: {
          client_email: string
          client_nom: string
          client_telephone: string | null
          created_at: string
          id: string
          numero: number
          paiement_statut: string
          retrait_creneau: string | null
          retrait_date: string | null
          retrait_marche_id: string | null
          retrait_type: string
          statut: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          total_cents: number
        }
        Insert: {
          client_email: string
          client_nom: string
          client_telephone?: string | null
          created_at?: string
          id?: string
          numero?: number
          paiement_statut?: string
          retrait_creneau?: string | null
          retrait_date?: string | null
          retrait_marche_id?: string | null
          retrait_type: string
          statut?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          total_cents: number
        }
        Update: {
          client_email?: string
          client_nom?: string
          client_telephone?: string | null
          created_at?: string
          id?: string
          numero?: number
          paiement_statut?: string
          retrait_creneau?: string | null
          retrait_date?: string | null
          retrait_marche_id?: string | null
          retrait_type?: string
          statut?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          total_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "commandes_retrait_marche_id_fkey"
            columns: ["retrait_marche_id"]
            isOneToOne: false
            referencedRelation: "marches"
            referencedColumns: ["id"]
          },
        ]
      }
      marches: {
        Row: {
          actif: boolean
          adresse: string | null
          code_postal: string | null
          commune: string
          created_at: string
          departement: string | null
          heure_debut: string | null
          heure_fin: string | null
          id: string
          jour_semaine: number | null
          latitude: number | null
          longitude: number | null
          nom: string
          point_retrait: boolean
          position: number
          type: string
          updated_at: string
        }
        Insert: {
          actif?: boolean
          adresse?: string | null
          code_postal?: string | null
          commune: string
          created_at?: string
          departement?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          jour_semaine?: number | null
          latitude?: number | null
          longitude?: number | null
          nom: string
          point_retrait?: boolean
          position?: number
          type?: string
          updated_at?: string
        }
        Update: {
          actif?: boolean
          adresse?: string | null
          code_postal?: string | null
          commune?: string
          created_at?: string
          departement?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          jour_semaine?: number | null
          latitude?: number | null
          longitude?: number | null
          nom?: string
          point_retrait?: boolean
          position?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      produits: {
        Row: {
          affinage: string | null
          aop: boolean
          categorie_id: string | null
          conseil_fromager: string | null
          created_at: string
          description: string | null
          disponible: boolean
          distance_km: number | null
          en_avant: boolean
          id: string
          image_url: string | null
          lait: string | null
          nom: string
          position: number
          prix_cents: number
          producteur: string | null
          region: string | null
          slug: string
          stock: number | null
          unite_label: string
          updated_at: string
        }
        Insert: {
          affinage?: string | null
          aop?: boolean
          categorie_id?: string | null
          conseil_fromager?: string | null
          created_at?: string
          description?: string | null
          disponible?: boolean
          distance_km?: number | null
          en_avant?: boolean
          id?: string
          image_url?: string | null
          lait?: string | null
          nom: string
          position?: number
          prix_cents: number
          producteur?: string | null
          region?: string | null
          slug: string
          stock?: number | null
          unite_label?: string
          updated_at?: string
        }
        Update: {
          affinage?: string | null
          aop?: boolean
          categorie_id?: string | null
          conseil_fromager?: string | null
          created_at?: string
          description?: string | null
          disponible?: boolean
          distance_km?: number | null
          en_avant?: boolean
          id?: string
          image_url?: string | null
          lait?: string | null
          nom?: string
          position?: number
          prix_cents?: number
          producteur?: string | null
          region?: string | null
          slug?: string
          stock?: number | null
          unite_label?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produits_categorie_id_fkey"
            columns: ["categorie_id"]
            isOneToOne: false
            referencedRelation: "categories"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
