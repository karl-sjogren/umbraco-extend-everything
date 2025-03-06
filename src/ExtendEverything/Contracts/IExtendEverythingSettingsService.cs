using ExtendEverything.Models;

namespace ExtendEverything.Contracts;

public interface IExtendEverythingSettingsService {
    Task<ExtendEverythingSettings> GetSettingsAsync(CancellationToken cancellationToken);
    Task SaveSettingsAsync(ExtendEverythingSettings settings, CancellationToken cancellationToken);
}
