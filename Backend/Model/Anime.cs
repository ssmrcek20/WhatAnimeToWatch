namespace Backend.Model
{
    public class Anime
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public virtual MainPicture? Main_picture { get; set; }
        public virtual AlternativeTitles? Alternative_titles { get; set; }
        public string? Start_date { get; set; }
        public string? End_date { get; set; }
        public string? Synopsis { get; set; }
        public float? Mean { get; set; }
        public int? Rank { get; set; }
        public int? Popularity { get; set; }
        public int? Num_list_users { get; set; }
        public int? Num_scoring_users { get; set; }
        public string? Nsfw { get; set; }
        public virtual ICollection<Genre>? Genres { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Updated_at { get; set; }
        public string? Media_type { get; set; }
        public string? Status { get; set; }
        public int? Num_episodes { get; set; }
        public virtual StartSeason? Start_season { get; set; }
        public virtual Broadcast? Broadcast { get; set; }
        public string? Source { get; set; }
        public int? Average_episode_duration { get; set; }
        public string? Rating { get; set; }
        public virtual ICollection<Studio>? Studios { get; set; }
    }
}
