using ExtendEverything.Contracts;
using ExtendEverything.Data;
using ExtendEverything.Models;
using Microsoft.EntityFrameworkCore;

namespace ExtendEverything.Services;

public class ExtendEverythingSettingsService : IExtendEverythingSettingsService {
    private readonly ExtendEverythingContext _extendEverythingContext;

    public ExtendEverythingSettingsService(ExtendEverythingContext extendEverythingContext) {
        _extendEverythingContext = extendEverythingContext;
    }

    public async Task<ExtendEverythingSettings> GetSettingsAsync(CancellationToken cancellationToken) {
        return await _extendEverythingContext.ExtendEverythingSettings.FirstOrDefaultAsync(cancellationToken) ?? new ExtendEverythingSettings();
    }

    public async Task SaveSettingsAsync(ExtendEverythingSettings settings, CancellationToken cancellationToken) {
        var existingSettings = await _extendEverythingContext.ExtendEverythingSettings.FirstOrDefaultAsync(cancellationToken);

        if(existingSettings == null) {
            _extendEverythingContext.ExtendEverythingSettings.Add(settings);
        } else {
            existingSettings.GreetingText = settings.GreetingText;
            existingSettings.AwesomeLevel = settings.AwesomeLevel;
        }

        await _extendEverythingContext.SaveChangesAsync(cancellationToken);
    }
}
