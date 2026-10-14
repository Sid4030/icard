import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Share2, CheckCircle2, Download } from 'lucide-react';

export default function QrModal({ attendee, onClose }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const accent = attendee.accentColor || '#3b82f6';

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://icard.cybercup.tech';
    const targetUrl = `${origin}/${attendee.slug}`;

    QRCode.toDataURL(targetUrl, {
      width: 480,
      margin: 1.5,
      color: {
        dark: '#050608',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR generation error:', err));
  }, [attendee.slug]);

  const handleCopy = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://icard.cybercup.tech';
    const link = `${origin}/${attendee.slug}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[360px] rounded-3xl p-6 text-center bg-[#121316] border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase block mb-1">
          CYBERCUP 6.0 PASS
        </span>
        <h3 className="text-xl font-semibold text-white tracking-tight mb-0.5">
          {attendee.name}
        </h3>
        <p className="text-xs uppercase tracking-wider mb-5" style={{ color: accent }}>
          {attendee.role}
        </p>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-2xl shadow-md inline-block mb-4">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt={`${attendee.name} QR Code`}
              className="w-48 h-48 object-contain rounded-lg"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-slate-800 text-xs">
              Generating QR...
            </div>
          )}
        </div>

        <p className="text-xs text-[#8a8f98] mb-5 px-2">
          Scan with your phone camera to open this digital pass.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 bg-white text-black hover:bg-white/90 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {qrCodeUrl && (
            <a
              href={qrCodeUrl}
              download={`cybercup-${attendee.slug}-qr.png`}
              className="py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer border border-white/10"
              title="Download QR"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
