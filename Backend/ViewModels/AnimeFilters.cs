namespace Backend.ViewModels
{
    public class AnimeFilters
    {
        public class AgeR
        {
            public List<string>? g { get; set; }
            public List<string>? pg { get; set; }
            public List<string>? pg13 { get; set; }
            public List<string>? r { get; set; }
            public List<string>? rPlus { get; set; }
            public List<string>? rx { get; set; }
        }

        public class EpDur
        {
            public int? min { get; set; }
            public int? max { get; set; }
        }

        public class GenreF
        {
            public List<SelectedGenre>? selectedGenres { get; set; }
        }

        public class MediaType
        {
            public List<string>? tv { get; set; }
            public List<string>? ova { get; set; }
            public List<string>? movie { get; set; }
            public List<string>? special { get; set; }
            public List<string>? ona { get; set; }
            public List<string>? music { get; set; }
        }

        public class NumEp
        {
            public int? min { get; set; }
            public int? max { get; set; }
        }

        public class RelDate
        {
            public DateTime? startDate { get; set; }
            public DateTime? endDate { get; set; }
        }

        public class AnimeFilter
        {
            public MediaType? mediaType { get; set; }
            public NumEp? numEp { get; set; }
            public EpDur? epDur { get; set; }
            public GenreF? genre { get; set; }
            public Status? status { get; set; }
            public RelDate? relDate { get; set; }
            public Source? source { get; set; }
            public StudioF? studio { get; set; }
            public AgeR? ageR { get; set; }
        }

        public class SelectedGenre
        {
            public int? id { get; set; }
            public string? name { get; set; }
            public List<object>? animes { get; set; }
        }

        public class SelectedStudio
        {
            public int? id { get; set; }
            public string? name { get; set; }
            public List<object>? animes { get; set; }
        }

        public class Source
        {
            public List<string>? selectedSources { get; set; }
        }

        public class Status
        {
            public List<string>? finished_airing { get; set; }
            public List<string>? currently_airing { get; set; }
            public List<string>? not_yet_aired { get; set; }
        }

        public class StudioF
        {
            public List<SelectedStudio>? selectedStudios { get; set; }
        }


    }
}
