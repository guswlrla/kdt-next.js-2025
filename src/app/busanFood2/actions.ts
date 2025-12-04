'use server';
import { supabase } from "@/supabase/client";
import { Restaurant } from "@/types/Restaurant";

export async function fetchRestaurants(page: number) {
  const limit = 8;
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("restaurants")
    .select("*", { count: "exact" })
    .order('UC_SEQ', { ascending: false })
    .range(offset, offset + limit - 1);

  if(error) {
    console.error("Error fetching restaurants", error);
    return { data : [], currentPage: page, totalPages: 0, error: error.message };
  }

  const totalPages = Math.ceil(count! / limit);

  return {
    data: data as Restaurant[],
    currentPage: page,
    totalPages,
    error: null
  };
}

export async function getRestaurantById(id: string) {
  if(!id) {
    return {data: null, error: "ID가 필요함"};
  }

  const numericId = Number(id);
  if(isNaN(numericId)) {
    return {data: null, error: "ID가 숫자가 아님"};
  }

  const {data, error} = await supabase
    .from("restaurants")
    .select("*")
    .eq('UC_SEQ', numericId)
    .single();
  
  if(error) {
    console.error(`ID: ${id}`, error);
    return {data: null, error: error.message};
  }

  return {data: data as Restaurant, error: null};
}