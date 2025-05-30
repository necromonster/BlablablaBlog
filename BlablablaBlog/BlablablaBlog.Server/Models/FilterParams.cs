using BlablablaBlog.Server.Model;

namespace BlablablaBlog.Server.Models
{
    public class FilterParams
    {
        public ICollection<Tag> Tags { get; set; } = [];
    }
}
